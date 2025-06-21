"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Client, Professional, Post, Plan, Agreement, Candidature, Rating, Comment, Payment, Premium, Category
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models import CandidatureStatus
import stripe
import os
from datetime import datetime, timedelta
api = Blueprint("api", __name__)

stripe.api_key=os.getenv("STRIPE_SECRET")
FRONT=os.getenv("FRONT")

# Allow CORS requests to this API
CORS(api)

# Get a list of users


@api.route("/users", methods=["GET"])
def get_users():
    stmt = select(User)
    users = db.session.execute(stmt).scalars().all()
    return jsonify([user.serialize() for user in users]), 200

# GET: user by id


# dynamic route <int:user_id>
@api.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({"error": "User not found"}), 404
    # No need for loop as it returns one object
    return jsonify(user.serialize()), 200

# POST: Add new user
@api.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()

    # Validate required fields
    required_fields = ["email", "password", "is_professional"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    # Check boolean
    is_professional = data.get("is_professional")
    if not isinstance(is_professional, bool):
        return jsonify({"error": "is_professional must be a boolean"}), 400

    try:
        # Create user
        new_user = User(
            email=data["email"],
            password=generate_password_hash(data["password"]),
            is_professional=is_professional
        )
        db.session.add(new_user)
        db.session.flush()

        # Create Professional or Client based on is_professional
        if new_user.is_professional:
            new_professional = Professional(user_id=new_user.id)
            db.session.add(new_professional)
        else:
            # Here you create a Client if is_professional is False
            new_client = Client(user_id=new_user.id)
            db.session.add(new_client)

        db.session.commit()

        # Create JWT token
        token = create_access_token(identity=str(new_user.id))
        return jsonify({'user': new_user.serialize(), 'token': token}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = db.session.execute(select(User).where(
        User.email == email)).scalar_one_or_none()
    if user is None or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": user.serialize()}), 200


# DELETE user by TOKEN - CAMBIAR A MODIFICAR CON USUARIO ACTIVO/NO ACTIVO? ---> el usuario no se borra, se desactiva ---> solo se puede borrar a si mismo, necesario autenticacion y extraemos el id del token


@api.route("/users", methods=["DELETE"])
@jwt_required()  # obligado usar el token para acceder a esta ruta
def delete_user():
    # Selection of user to be deleted:
    id = get_jwt_identity()  # Get the user ID from the JWT token
    stmt = select(User).where(User.id == id)
    user = db.session.execute(stmt).scalar_one_or_none()
    # If user does not exist:
    if user is None:
        return jsonify({"error": "User not found"}), 404
    # User detelion
    user.active_user = False  # Instead of deleting, we deactivate the user
    # Changes saved
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200

# PUT: Modify user BY TOKEN


@api.route("/users", methods=["PUT"])
@jwt_required()  # obligated to use the token to access this route
def update_user():
    # Extraction of data from body
    id = get_jwt_identity()  # Get the user ID from the JWT token
    data = request.get_json()
    # Searching of user to edit:
    stmt = select(User).where(User.id == id)
    user = db.session.execute(stmt).scalar_one_or_none()
    # If user does not exist:
    if user is None:
        return jsonify({"error": "User not found"}), 404

    # Modification of properties of object user
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)
    user.is_professional = data.get("is_professional", user.is_professional)
    user.firstname = data.get("firstname", user.firstname)
    user.lastname1 = data.get("lastname1", user.lastname1)
    user.lastname2 = data.get("lastname2", user.lastname2)
    user.address_street = data.get("address_street", user.address_street)
    user.address_city = data.get("address_city", user.address_city)
    user.address_postcode = data.get("address_postcode", user.address_postcode)
    user.address_county = data.get("address_county", user.address_county)
    user.address_country = data.get("address_country", user.address_country)
    user.tax_number = data.get("tax_number", user.tax_number)
    user.geo_dir = data.get("geo_dir", user.geo_dir)
    user.active_user = data.get("active_user", user.active_user)

    # Creates Professional if is_professional is True and doesn"t exists
    if user.is_professional and not user.professional:
        new_professional = Professional(user_id=user.id)
        db.session.add(new_professional)

    try:
        # save changes
        db.session.commit()
        return jsonify(user.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# GET: list of Clients


@api.route("/clients", methods=["GET"])
def get_clients():
    stmt = select(Client)
    clients = db.session.execute(stmt).scalars().all()
    return jsonify([client.serialize() for client in clients]), 200


# GET: Client by id
# dynamic route <int:client_id>
@api.route("/clients/<int:client_id>", methods=["GET"])
def get_client(client_id):
    stmt = select(Client).where(Client.id == client_id)
    client = db.session.execute(stmt).scalar_one_or_none()
    if client is None:
        return jsonify({"error": "Client not found"}), 404
    # No need for loop as it returns one object
    return jsonify(client.serialize()), 200

# POST FOR CLIENTS NOT NEEDED. RELATIONSHIP .
# DELETE FOR CLIENTS NOT NEEDED
# PUT FOR CLIENTS NOT NEEDED

# GET: list of Professionals


@api.route("/professionals", methods=["GET"])
def get_professionals():
    stmt = select(Professional)
    professionals = db.session.execute(stmt).scalars().all()
    return jsonify([professional.serialize() for professional in professionals]), 200

# GET: Professional by id


# dynamic route <int:client_id>
@api.route("/professionals/<int:professional_id>", methods=["GET"])
def get_professional(professional_id):
    stmt = select(Professional).where(Professional.id == professional_id)
    professional = db.session.execute(stmt).scalar_one_or_none()
    if professional is None:
        return jsonify({"error": "Professional not found"}), 404
    # No need for loop as it returns one object
    return jsonify(professional.serialize()), 200

# PUT: Modify Professional


@api.route("/professionals/<int:id>", methods=["PUT"])  # Dynamic route
@jwt_required()  # obligated to use the token to access this route
def update_professional(id):
    # Extraction of data from body
    data = request.get_json()
    # Searching of professional to edit:
    stmt = select(Professional).where(Professional.id == id)
    professional = db.session.execute(stmt).scalar_one_or_none()
    # If user does not exist:
    if professional is None:
        return jsonify({"error": "Professional not found"}), 404

    # Modification of properties of object user
    professional.is_premium = data.get("is_premium", professional.is_premium)
    professional.prof_experience = data.get(
        "prof_experience", professional.prof_experience)
    professional.prof_url = data.get("prof_url", professional.prof_url)
    # Changes saved
    db.session.commit()
    return jsonify(professional.serialize()), 200

# GET: list of Post


@api.route("/posts", methods=["GET"])
def get_posts():
    stmt = select(Post)
    posts = db.session.execute(stmt).scalars().all()
    return jsonify([post.serialize() for post in posts]), 200

# GET: All posts by client id


@api.route("/posts/client/<int:client_id>", methods=["GET"])
def get_posts_by_client(client_id):
    stmt = select(Post).where(Post.client_id == client_id)
    posts = db.session.execute(stmt).scalars().all()
    if not posts:
        return jsonify({"error": "No posts found for this client"}), 404
    return jsonify([post.serialize() for post in posts]), 200

# GET: Post by id


@api.route("/posts/<int:id>", methods=["GET"])  # dynamic route <int:post_id>
def get_post(id):
    stmt = select(Post).where(Post.id == id)
    post = db.session.execute(stmt).scalar_one_or_none()
    if post is None:
        return jsonify({"error": "Post not found"}), 404
    # No need for loop as it returns one object
    return jsonify(post.serialize()), 200

# POST: Create new Post

@api.route("/api/posts", methods=["POST"])
@jwt_required()
def create_post():
    data = request.get_json()
    user_id = get_jwt_identity()

    # Busca el User primero
    user = db.session.execute(select(User).where(User.id == user_id)).scalar_one_or_none()
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Busca el cliente asociado al user
    client = db.session.execute(select(Client).where(Client.user_id == user_id)).scalar_one_or_none()
    if not client:
        return jsonify({"error": "Client not found"}), 404
    
    required_fields = [
        "remote_project", "project_city", "project_county", "project_country",
        "post_description", "estimated_budged", "post_open", "post_active", "post_completed"
    ]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
    
    try:
        new_post = Post(
            remote_project=data["remote_project"],
            project_city=data["project_city"],
            project_county=data["project_county"],
            project_country=data["project_country"],
            post_description=data["post_description"],
            estimated_budged=data["estimated_budged"],
            post_open=data["post_open"],
            post_active=data["post_active"],
            post_completed=data["post_completed"],
            category_id=data.get("category_id"),  # opcional
            client_id=client.client_id  # Usa el client_id, no el user.id
        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify(new_post.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# DELETE Post by id - IT DOES NOT WORK PROPERLY BUT IT MAY NOT BE NECESSARY


@api.route("/posts/<int:id>", methods=["DELETE"])  # DYNAMIC ROUTE
@jwt_required()  # obligated to use the token to access this route
def delete_post(id):
    # Selection of post to be deleted:
    stmt = select(Post).where(Post.id == id)
    post = db.session.execute(stmt).scalar_one_or_none()
    user_id = get_jwt_identity()  # Get the user ID from the JWT token
    # Check if the user is the owner of the post
    if post.client_id != user_id:
        return jsonify({"error": "You are not authorized to delete this post"}), 403
    # If post does not exist:
    if post is None:
        return jsonify({"error": "Post not found"}), 404
    # Post detelion
    db.session.delete(post)
    # Changes saved
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200
   
#PUT: Modify Post
@api.route("/posts/<int:id>", methods=["PUT"]) #Dynamic route
def update_post(id):
    # Extraction of data from body
    data = request.get_json()
    stmt = select(Post).where(Post.id == id)
    post = db.session.execute(stmt).scalar_one_or_none()
    # If post does not exist:
    if post is None:
        return jsonify({"error": "Post not found"}), 404

    user_id = get_jwt_identity()  # Get the user ID from the JWT token
    # Check if the user is the owner of the post
    #get client_id from Client table
    client = db.session.execute(select(Client).where(
        Client.user_id == user_id)).scalar_one_or_none()
    
    if post.client_id != client.id:
        return jsonify({"error": "You are not authorized to modify this post"}), 403

    # Modification of properties of object post
    post.remote_project = data.get("remote_project", post.remote_project)
    post.project_city = data.get("project_city", post.project_city)
    post.project_county = data.get("project_county", post.project_county)
    post.project_country = data.get("project_country", post.project_country)
    post.post_description = data.get("post_description", post.post_description)
    post.estimated_budged = data.get("estimated_budged", post.estimated_budged)
    post.post_open = data.get("post_open", post.post_open)
    post.post_active = data.get("post_active", post.post_active)
    post.post_completed = data.get("post_completed", post.post_completed)

    # Changes saved
    db.session.commit()
    return jsonify(post.serialize()), 200

# GET: list of Agreements


@api.route("/agreements", methods=["GET"])
def get_agreements():
    stmt = select(Agreement)  # Corregido: antes era Post
    agreements = db.session.execute(stmt).scalars().all()
    return jsonify([agreement.serialize() for agreement in agreements]), 200

# GET: Agreement by id


@api.route("/agreements/<int:agreement_id>", methods=["GET"])
def get_agreement(agreement_id):
    stmt = select(Agreement).where(Agreement.id == agreement_id)
    agreement = db.session.execute(stmt).scalar_one_or_none()
    if agreement is None:
        return jsonify({"error": "Agreement not found"}), 404
    # No need for loop as it returns one object
    return jsonify(agreement.serialize()), 200

# POST: Add new Agreement
@api.route("/agreements", methods=["POST"])
def create_agreement():
    #extraemos la informacion del body puede ser con request.json
    data = request.get_json()
        
    try:
        new_agreement = Agreement(
            agreement_date=data["agreement_date"],
            agreement_status=data["agreement_status"],
            candidature_id=data["candidature_id"],
            client_id=data["client_id"],
            post_id=data["post_id"],
            professional_id=data["professional_id"],            
        )
        db.session.add(new_agreement)  
        db.session.commit()
        return jsonify(new_agreement.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
#PUT: Modify Agreement
@api.route("/agreements/<int:id>", methods=["PUT"]) #Dynamic route
def update_agreement(id):
    data = request.get_json()
    stmt = select(Agreement).where(Agreement.id == id)
    agreement = db.session.execute(stmt).scalar_one_or_none()
    if agreement is None:
        return jsonify({"error": "Agreement not found"}), 404

    # Validar y asignar el nuevo estado
    status = data.get("agreement_status")
    if status not in ["pending", "accepted", "rejected"]:
        return jsonify({"error": "Invalid agreement_status"}), 400
    # SQLAlchemy Enum lo convierte automáticamente
    agreement.agreement_status = status

    db.session.commit()
    return jsonify(agreement.serialize()), 200


# POST: Create new Candidature
@api.route("/candidatures", methods=["POST"])
@jwt_required()  # obligated to use the token to access this route
def create_candidature():
    client = None
    professional = None
    # Extraction of data from body
    data = request.get_json()
    user_id = get_jwt_identity()  # Get the user ID from the JWT token

    #get user from User table
    user = db.session.execute(select(User).where(
        User.id == user_id)).scalar_one_or_none()
    if user is None:
        return jsonify({"error": "User not found"}), 403
    # Buscar el client_id o professional_id correspondiente al usuario autenticado
    # Esto es necesario para determinar si el usuario es cliente o profesional
    # Si el usuario es cliente, se usa client_id, si es profesional, se usa professional_id
    # Si el usuario no es ni cliente ni profesional, se devuelve un error
    if not user.is_professional:
        # El usuario es cliente
        client = db.session.execute(select(Client).where(
            Client.user_id == user_id)).scalar_one_or_none()
        if not client:
            return jsonify({"error": "Client not found"}), 404
    else:
        # El usuario es profesional
        professional = db.session.execute(select(Professional).where(
            Professional.user_id == user_id)).scalar_one_or_none()
        if not professional:
            return jsonify({"error": "Professional not found"}), 404    
    # If user is neither client nor professional, return error
    if not client and not professional:
        return jsonify({"error": "User is neither client nor professional"}), 403
    # Validate required fields


    #get post_id from Post table
    post_id = data.get("post_id")
    post = db.session.execute(select(Post).where(Post.id == post_id)).scalar_one_or_none()
    if not post:
        return jsonify({"error": "Post not found"}), 404
    

    required_fields = ["candidature_message", "post_id"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
    try:
        # Create new candidature
        new_candidature = Candidature(
            candidature_message=data["candidature_message"],
            post_id=data["post_id"],
            client_id=client.id if client else post.client_id,  # Use client_id if user is client
            professional_id=professional.id if professional else None
        )
        db.session.add(new_candidature)
        db.session.commit()
        return jsonify(new_candidature.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# GET: list of Candidatures


@api.route("/candidatures", methods=["GET"])
def get_candidatures():
    stmt = select(Candidature)
    candidatures = db.session.execute(stmt).scalars().all()
    return jsonify([candidature.serialize() for candidature in candidatures]), 200

# GET: Candidature by id


@api.route("/candidatures/<int:id>", methods=["GET"])
def get_candidature(id):
    stmt = select(Candidature).where(Candidature.id == id)
    candidature = db.session.execute(stmt).scalar_one_or_none()
    if candidature is None:
        return jsonify({"error": "Candidature not found"}), 404
    # No need for loop as it returns one object
    return jsonify(candidature.serialize()), 200



#PUT: Modify Candidature
@api.route("/candidatures/<int:id>", methods=["PUT"]) #Dynamic route
def update_candidature(id):
    # Extraction of data from body
    data = request.get_json()
    stmt = select(Candidature).where(Candidature.id == id)
    candidature = db.session.execute(stmt).scalar_one_or_none()
    # If candidature does not exist:
    if candidature is None:
        return jsonify({"error": "Candidature not found"}), 404

    # Modification of properties of object
    candidature.candidature_message = data.get(
        "candidature_message", candidature.candidature_message)

    # Changes saved
    db.session.commit()
    return jsonify(candidature.serialize()), 200

# GET: list of Ratings


@api.route("/ratings", methods=["GET"])
def get_ratings():
    stmt = select(Rating)
    ratings = db.session.execute(stmt).scalars().all()
    return jsonify([rating.serialize() for rating in ratings]), 200

# GET: Rating by id


@api.route("/ratings/<int:id>", methods=["GET"])
def get_rating(id):
    stmt = select(Rating).where(Rating.id == id)
    rating = db.session.execute(stmt).scalar_one_or_none()
    if rating is None:
        return jsonify({"error": "Rating not found"}), 404
    # No need for loop as it returns one object
    return jsonify(rating.serialize()), 200

# POST: Create new Rating


@api.route("/ratings", methods=["POST"])
@jwt_required()  # obligated to use the token to access this route
def create_rating():
    # Extraction of data from body
    data = request.get_json()
    user_id = get_jwt_identity()
    user = db.session.execute(select(User).where(
        User.id == user_id)).scalar_one_or_none()
    if user is None:
        return jsonify({"error": "user error"}), 403

    # Validate required fields
    required_fields = ["rating_professional", "professional_id", "client_id"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
    # check if user has given a rating to the same professional
    check = select(Rating).where(
        Rating.professional_id == data['professional_id'],
        Rating.client_id == data['client_id']
    )
    existing_rating = db.session.execute(check).scalar_one_or_none()
    if existing_rating:
        existing_rating.rating_professional = data["rating_professional"]
        db.session.commit()
        return jsonify(existing_rating.serialize()), 200
    try:
        # Create new rating
        new_rating = Rating(
            rating_professional=data["rating_professional"],
            professional_id=data['professional_id'],
            client_id=data['client_id']
        )
        db.session.add(new_rating)
        db.session.commit()
        return jsonify(new_rating.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# GET: list of Comments


@api.route("/comments", methods=["GET"])
def get_comments():
    stmt = select(Comment)  # Corregido: antes era Rating
    comments = db.session.execute(stmt).scalars().all()
    return jsonify([comment.serialize() for comment in comments]), 200

# GET: Comment by id


@api.route("/comments/<int:id>", methods=["GET"])
def get_comment(id):
    stmt = select(Comment).where(Comment.id == id)
    comment = db.session.execute(stmt).scalar_one_or_none()
    if comment is None:
        return jsonify({"error": "Comment not found"}), 404
    # No need for loop as it returns one object
    return jsonify(comment.serialize()), 200

# POST: Create new Comment


@api.route("/comments", methods=["POST"])
@jwt_required()  # obligated to use the token to access this route
def create_comment():
    # solo el cliente puede crear un comentario, por lo que no es necesario comprobar si el usuario es profesional o no
    # Extraction of data from body
    data = request.get_json()
    user_id = get_jwt_identity()
    # Buscar el client_id correspondiente al usuario autenticado
    client = db.session.execute(select(Client).where(
        Client.user_id == user_id)).scalar_one_or_none()
    if not client:
        return jsonify({"error": "Client not found"}), 404
    # Validate required fields
    required_fields = ['comment_text', 'professional_id']
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
    try:
        # Create new comment
        new_comment = Comment(
            comment_text=data['comment_text'],
            professional_id=data['professional_id'],
            client_id=client.id  # Usar el client.id correcto
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# PUT: Modify Comment
@api.route("/comments/<int:id>", methods=["PUT"])  # Dynamic route
@jwt_required()  # obligated to use the token to access this route
def update_comment(id):
    # Extraction of data from body
    data = request.get_json()
    stmt = select(Comment).where(Comment.id == id)
    comment = db.session.execute(stmt).scalar_one_or_none()
    if comment is None:
        return jsonify({"error": "Comment not found"}), 404

    user_id = get_jwt_identity()
    # Usa client_id para validar propiedad
    client = db.session.execute(select(Client).where(
        Client.user_id == user_id)).scalar_one_or_none()
    if not client or comment.client_id != client.id:
        return jsonify({"error": "You are not authorized to modify this comment"}), 403

    comment.comment_text = data.get("comment_text", comment.comment_text)
    db.session.commit()
    return jsonify(comment.serialize()), 200

# GET: list of Payments


@api.route("/payments", methods=["GET"])
def get_payments():
    stmt = select(Payment)
    payments = db.session.execute(stmt).scalars().all()
    return jsonify([payment.serialize() for payment in payments]), 200

# GET: Payment by id


@api.route("/payments/<int:id>", methods=["GET"])
def get_payment(id):
    stmt = select(Payment).where(Payment.id == id)
    payment = db.session.execute(stmt).scalar_one_or_none()
    if payment is None:
        return jsonify({"error": "Payment not found"}), 404
    # No need for loop as it returns one object
    return jsonify(payment.serialize()), 200

# PUT: Modify Payment - MAY NOT BE REQUIRED DEPENDING ON WHETHER WE USE SOME VALIDATION IN THE FRONT END


@api.route("/payments/<int:id>", methods=["PUT"])  # Dynamic route
@jwt_required()  # obligated to use the token to access this route
def update_payment(id):
    # Extraction of data from body
    data = request.get_json()
    stmt = select(Payment).where(Payment.id == id)
    payment = db.session.execute(stmt).scalar_one_or_none()
    # If payment does not exist:
    if payment is None:
        return jsonify({"error": "Payment not found"}), 404

    # Modification of properties of object
    payment.payment_amount = data.get("payment_amount", payment.payment_amount)

    # Changes saved
    db.session.commit()
    return jsonify(payment.serialize()), 200


# GET: list of Premiums
@api.route("/premiums", methods=["GET"])
def get_premiums():
    stmt = select(Premium)
    premiums = db.session.execute(stmt).scalars().all()
    return jsonify([premium.serialize() for premium in premiums]), 200

# GET: Premium by id


@api.route("/premiums/<int:id>", methods=["GET"])
def get_premium(id):
    stmt = select(Premium).where(Premium.id == id)
    premium = db.session.execute(stmt).scalar_one_or_none()
    if premium is None:
        return jsonify({"error": "Premium not found"}), 404
    # No need for loop as it returns one object
    return jsonify(premium.serialize()), 200


# POST: Create new Premium
@api.route("/premiums", methods=["POST"])
@jwt_required()  # obligated to use the token to access this route
def create_premium():
    # Extraction of data from body
    data = request.get_json()
    user_id = get_jwt_identity()
    # Buscar el professional_id correspondiente al usuario autenticado
    professional = db.session.execute(select(Professional).where(
        Professional.user_id == user_id)).scalar_one_or_none()
    if not professional:
        return jsonify({"error": "Professional not found"}), 404
    # Validate required fields
    required_fields = [
        "auto_renewal", "expiration_date", "premium_types", "renewal_date"
    ]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400
    try:
        # Create new premium
        new_premium = Premium(
            auto_renewal=data["auto_renewal"],
            expiration_date=data["expiration_date"],
            premium_types=data["premium_types"],
            renewal_date=data["renewal_date"],
            professional_id=professional.id  # Usar el professional.id correcto
        )
        db.session.add(new_premium)
        db.session.commit()
        return jsonify(new_premium.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# PUT: Modify Premium
@api.route("/premiums/<int:id>", methods=["PUT"])  # Dynamic route
@jwt_required()  # obligated to use the token to access this route
def update_premium(id):
    # Extraction of data from body
    data = request.get_json()
    stmt = select(Premium).where(Premium.id == id)
    premium = db.session.execute(stmt).scalar_one_or_none()
    # If premium does not exist:
    if premium is None:
        return jsonify({"error": "Premium not found"}), 404

    # Modification of properties of object
    premium.auto_renewal = data.get("auto_renewal", premium.auto_renewal)
    premium.expiration_date = data.get(
        "expiration_date", premium.expiration_date)
    premium.premium_types = data.get("premium_types", premium.premium_types)
    premium.renewal_date = data.get("renewal_date", premium.renewal_date)

    # Changes saved
    db.session.commit()
    return jsonify(premium.serialize()), 200

# GET: list of Categories


@api.route("/categories", methods=["GET"])
def get_categories():
    stmt = select(Category)
    categories = db.session.execute(stmt).scalars().all()
    return jsonify([category.serialize() for category in categories]), 200

# GET: Category by id


@api.route("/categories/<int:id>", methods=["GET"])
def get_category(id):
    stmt = select(Category).where(Category.id == id)
    category = db.session.execute(stmt).scalar_one_or_none()
    if category is None:
        return jsonify({"error": "Category not found"}), 404
    # No need for loop as it returns one object
    return jsonify(category.serialize()), 200

# POST: Add new Category
@api.route("/categories", methods=["POST"])
def create_category():
    #extraemos la informacion del body puede ser con request.json
    data = request.get_json()
        
    try:
        new_category = Category(
            name=data["name"],           
        )
        db.session.add(new_category)  
        db.session.commit()
        return jsonify(new_category.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
#PUT: Modify Category 
@api.route("/categories/<int:id>", methods=["PUT"]) #Dynamic route
def update_category(id):
    # Extraction of data from body
    data = request.get_json()
    stmt = select(Category).where(Category.id == id)
    category = db.session.execute(stmt).scalar_one_or_none()
    # If category does not exist:
    if category is None:
        return jsonify({"error": "Category not found"}), 404

    # Modification of properties of object
    category.name = data.get("name", category.name)

    # Changes saved
    db.session.commit()
    return jsonify(category.serialize()), 200

@api.route('/create-checkout-session', methods=['POST'])
@jwt_required()  # obligated to use the token to access this route
def create_checkout_session():
    try:
        body = request.json
        if not body or 'items' not in body:
            return jsonify({"error": "Invalid request, 'items' is required"}), 400
        session = stripe.checkout.Session.create(
            ui_mode = 'embedded',
            line_items=body['items'],
            mode='payment',
            return_url=str(os.getenv("FRONT")) +
            'return?session_id={CHECKOUT_SESSION_ID}',
        )
    except Exception as e:
        return str(e)

    return jsonify({"clientSecret":session.client_secret})


@api.route('/session-status', methods=['GET'])
def session_status():
    session = stripe.checkout.Session.retrieve(request.args.get('session_id'))

    return jsonify(status=session.status, customer_email=session.customer_details.email)


#plans

@api.route('/plans', methods=['GET'])
def get_plans():
    try:
        stm = select(Plan)
        plans = db.session.execute(stm).scalars().all()
        if not plans:
            return jsonify({"error": "No plans found"}), 404
        # Serialize the plans
        return jsonify([plan.serialize() for plan in plans]), 200
    except Exception as e:
        db.session.rollback()
        # Handle any exceptions that occur
        return jsonify({"error": str(e)}), 500

# after stripe purchase is completed, we update premium and user plan in the database
@api.route('/stripe-update-db', methods=['POST'])
@jwt_required()  # obligated to use the token to access this route
def update_db():
    try:
        id = get_jwt_identity()  # Get the user ID from the JWT token
        user = db.session.execute(select(User).where(User.id == id)).scalar_one_or_none()
        if not user:
            return jsonify({"error": "User not found"}), 404
        # Check if the user is a professional
        if not user.is_professional:
            return jsonify({"error": "User is not a professional"}), 403
        body = request.json
        if not body or 'plan_id' not in body :
            return jsonify({"error": "Invalid request, 'plan_id' is required"}), 400
        
        plan = db.session.execute(select(Plan).where(Plan.stripe == body['plan_id'])).scalar_one_or_none()
        if not plan:
            return jsonify({"error": "Plan not found"}), 404
        
        user = db.session.execute(select(User).where(User.id == id)).scalar_one_or_none()
      
        
        # Update the user's plan
        user.plan_id = plan.id
        db.session.commit()

        premium = Premium(
            auto_renewal=True,
            expiration_date=(datetime.utcnow() + timedelta(days=30)).date(),
            premium_types=plan.name,
            renewal_date=(datetime.utcnow() + timedelta(days=30)).date(),
            professional_id=user.professional.id  # Assuming user has a professional relationship
        )

        db.session.add(premium)
        db.session.commit()
        
        return jsonify({"message": "User's plan updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    


@api.route("/change-password/<int:user_id>", methods=["PUT"])
def change_password(user_id):
    data = request.get_json()

    if not data or not data.get("newPassword"):
        return jsonify({"success": False, "message": "Falta la nueva contraseña"}), 400

    hashed_password = generate_password_hash(data["newPassword"])

    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()

    if user is None:
        return jsonify({"success": False, "message": f"No se encontró el usuario con id: {user_id}"}), 404

    user.password = hashed_password
    db.session.commit()

    return jsonify({"success": True, "message": "Contraseña actualizada con éxito"}), 200