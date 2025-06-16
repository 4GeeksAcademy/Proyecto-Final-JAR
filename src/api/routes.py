"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Client, Professional, Post, Agreement, Candidature, Rating, Comment, Payment, Premium, Category
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
 
api = Blueprint("api", __name__)

# Allow CORS requests to this API
from flask_cors import CORS
CORS(api)

#Get a list of users
@api.route("/users", methods=["GET"])
def get_users():
    stmt = select(User)
    users = db.session.execute(stmt).scalars().all()
    return jsonify([user.serialize() for user in users]), 200

# GET: user by id
@api.route("/users/<int:user_id>", methods=["GET"]) #dynamic route <int:user_id>
def get_user(user_id):
    stmt = select(User).where(User.id == user_id)
    user = db.session.execute(stmt).scalar_one_or_none()
    if user is None:
        return jsonify({"error": "User not found"}), 404
    #No need for loop as it returns one object
    return jsonify(user.serialize()), 200

# POST: Add new user
@api.route("/users", methods=["POST"])
def create_user():
    #extraemos la informacion del body puede ser con request.json
    data = request.get_json()
    #verificamos que tenemos los elementos OBLIGATORIOS para crear un registro nuevo 
        
    # Validate required fields
    required_fields = [
        "email", "password"
    ]
    
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {", ".join(missing)}"}), 400

    try:
        new_user = User(
            email=data["email"],
            password=data["password"],  #REMOVE SERIALIZATION IN PRODUCTION
            is_professional=data["is_professional"],
           
        )
        db.session.add(new_user)
        db.session.flush() #Assigns ID without committing

        #Create Professional if is_professional is True
        if new_user.is_professional:
            new_professional = Professional(user_id=new_user.id)
            db.session.add(new_professional)

        db.session.commit()
        return jsonify(new_user.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#DELETE user by id - CAMBIAR A MODIFICAR CON USUARIO ACTIVO/NO ACTIVO?
@api.route("/users/<int:id>", methods=["DELETE"]) #DYNAMIC ROUTE
def delete_user(id):
    #Selection of user to be deleted:
    stmt = select(User).where(User.id == id)
    user = db.session.execute(stmt).scalar_one_or_none()
    #If user does not exist:
    if user is None:
        return jsonify({"error": "User not found"}), 404
    #User detelion
    db.session.delete(user)
    #Changes saved
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200

#PUT: Modify user
@api.route("/users/<int:id>", methods=["PUT"]) #Dynamic route
def update_user(id):
    #Extraction of data from body
    data = request.get_json()
    #Searching of user to edit:
    stmt = select(User).where(User.id == id)
    user = db.session.execute(stmt).scalar_one_or_none()
    #If user does not exist:
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    #Modification of properties of object user
    user.email = data.get("email", user.email) 
    user.password = data.get("password", user.password)
    user.is_professional=data.get("is_professional", user.is_professional)
    user.firstname=data.get("firstname", user.firstname)
    user.lastname1=data.get("lastname1", user.lastname1)
    user.lastname2=data.get("lastname2", user.lastname2)
    user.address_street=data.get("address_street", user.address_street)
    user.address_city=data.get("address_city", user.address_city)
    user.address_postcode=data.get("address_postcode", user.address_postcode)
    user.address_county=data.get("address_county", user.address_county)
    user.address_country=data.get("address_country", user.address_country)
    user.tax_number=data.get("tax_number", user.tax_number)
    user.geo_dir=data.get("geo_dir",user.geo_dir)
    user.active_user=data.get("active_user", user.active_user)

    #Creates Professional if is_professional is True and doesn"t exists
    if user.is_professional and not user.professional:
        new_professional = Professional(user_id=user.id)
        db.session.add(new_professional)

    try:
        #save changes
        db.session.commit()
        return jsonify(user.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#GET: list of Clients
@api.route("/clients", methods=["GET"])
def get_clients():
    stmt = select(Client)
    clients = db.session.execute(stmt).scalars().all()
    return jsonify([client.serialize() for client in clients]), 200
    
    
# GET: Client by id
@api.route("/clients/<int:client_id>", methods=["GET"]) #dynamic route <int:client_id>
def get_client(client_id):
    stmt = select(Client).where(Client.id == client_id)
    client = db.session.execute(stmt).scalar_one_or_none()
    if client is None:
        return jsonify({"error": "Client not found"}), 404
    #No need for loop as it returns one object
    return jsonify(client.serialize()), 200

#POST FOR CLIENTS NOT NEEDED. RELATIONSHIP .
#DELETE FOR CLIENTS NOT NEEDED
#PUT FOR CLIENTS NOT NEEDED

#GET: list of Professionals
@api.route("/professionals", methods=["GET"])
def get_professionals():
    stmt = select(Professional)
    professionals = db.session.execute(stmt).scalars().all()
    return jsonify([professional.serialize() for professional in professionals]), 200
    
#GET: Professional by id
@api.route("/professionals/<int:professional_id>", methods=["GET"]) #dynamic route <int:client_id>
def get_professional(professional_id):
    stmt = select(Professional).where(Professional.id == professional_id)
    professional = db.session.execute(stmt).scalar_one_or_none()
    if professional is None:
        return jsonify({"error": "Professional not found"}), 404
    #No need for loop as it returns one object
    return jsonify(professional.serialize()), 200

#PUT: Modify Professional
@api.route("/professionals/<int:id>", methods=["PUT"]) #Dynamic route
def update_professional(id):
    #Extraction of data from body
    data = request.get_json()
    #Searching of professional to edit:
    stmt = select(Professional).where(Professional.id == id)
    professional = db.session.execute(stmt).scalar_one_or_none()
    #If user does not exist:
    if professional is None:
        return jsonify({"error": "Professional not found"}), 404
    
    #Modification of properties of object user
    professional.is_premium = data.get("is_premium", professional.is_premium) 
    professional.prof_experience = data.get("prof_experience", professional.prof_experience) 
    professional.prof_url = data.get("prof_url", professional.prof_url) 
    #Changes saved
    db.session.commit()
    return jsonify(professional.serialize()), 200

#GET: list of Post
@api.route("/posts", methods=["GET"])
def get_posts():
    stmt = select(Post)
    posts = db.session.execute(stmt).scalars().all()
    return jsonify([post.serialize() for post in posts]), 200

#GET: All posts by client id
@api.route("/posts/client/<int:client_id>", methods=["GET"])
def get_posts_by_client(client_id):
    stmt = select(Post).where(Post.client_id == client_id)
    posts = db.session.execute(stmt).scalars().all()
    if not posts:
        return jsonify({"error": "No posts found for this client"}), 404
    return jsonify([post.serialize() for post in posts]), 200
    
#GET: Post by id
@api.route("/posts/<int:id>", methods=["GET"]) #dynamic route <int:post_id>
def get_post(id):
    stmt = select(Post).where(Post.id == id)
    post = db.session.execute(stmt).scalar_one_or_none()
    if post is None:
        return jsonify({"error": "Post not found"}), 404
    #No need for loop as it returns one object
    return jsonify(post.serialize()), 200

#DELETE Post by id - IT DOES NOT WORK PROPERLY BUT IT MAY NOT BE NECESSARY
@api.route("/posts/<int:id>", methods=["DELETE"]) #DYNAMIC ROUTE
def delete_post(id):
    #Selection of post to be deleted:
    stmt = select(Post).where(Post.id == id)
    post = db.session.execute(stmt).scalar_one_or_none()
    #If post does not exist:
    if post is None:
        return jsonify({"error": "Post not found"}), 404
    #Post detelion
    db.session.delete(post)
    #Changes saved
    db.session.commit()
    return jsonify({"message": "Post deleted"}), 200

# POST: Add new Post
@api.route("/posts", methods=["POST"])
def create_post():
    #extraemos la informacion del body puede ser con request.json
    data = request.get_json()
        
    try:
        new_post = Post(
            client_id=data["client_id"],
            category_id=data["category_id"],
            estimated_budged=data["estimated_budged"],
            post_active=data["post_active"],
            post_completed=data["post_completed"],
            post_description=data["post_description"],
            post_open=data["post_open"],
            project_city=data["project_city"],
            project_country=data["project_country"],
            project_county=data["project_county"],
            remote_project=data["remote_project"],            
        )
        db.session.add(new_post)
            
        db.session.commit()
        return jsonify(new_post.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
#PUT: Modify Post
@api.route("/posts/<int:id>", methods=["PUT"]) #Dynamic route
def update_post(id):
    #Extraction of data from body
    data = request.get_json()
    stmt = select(Post).where(Post.id == id)
    post = db.session.execute(stmt).scalar_one_or_none()
    #If user does not exist:
    if post is None:
        return jsonify({"error": "Post not found"}), 404
    
    #Modification of properties of object post
    post.category_id = data.get("category_id", post.category_id)
    post.remote_project = data.get("remote_project", post.remote_project)
    post.project_city = data.get("project_city", post.project_city)
    post.project_county = data.get("project_county", post.project_county)
    post.project_country = data.get("project_country", post.project_country)
    post.post_description = data.get("post_description", post.post_description)   
    post.estimated_budged = data.get("estimated_budged", post.estimated_budged)   
    post.post_open = data.get("post_open", post.post_open)
    post.post_active = data.get("post_active", post.post_active)
    post.post_completed = data.get("post_completed", post.post_completed)

    #Changes saved
    db.session.commit()
    return jsonify(post.serialize()), 200

#GET: list of Agreements
@api.route("/agreements", methods=["GET"])
def get_agreements():
    stmt = select(Post)
    agreements = db.session.execute(stmt).scalars().all()
    return jsonify([agreement.serialize() for agreement in agreements]), 200

# GET: Agreement by id
@api.route("/agreements/<int:agreement_id>", methods=["GET"])
def get_agreement(agreement_id):
    stmt = select(Agreement).where(Agreement.id == agreement_id)
    agreement = db.session.execute(stmt).scalar_one_or_none()
    if agreement is None:
        return jsonify({"error": "Agreement not found"}), 404
    #No need for loop as it returns one object
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
    #Extraction of data from body
    data = request.get_json()
    stmt = select(Agreement).where(Agreement.id == id)
    agreement = db.session.execute(stmt).scalar_one_or_none()
    #If agreement does not exist:
    if agreement is None:
        return jsonify({"error": "Agreement not found"}), 404
    
    #Modification of properties of object
    agreement.agreement_status = data.get("agreement_status", agreement.agreement_status)
    
    #Changes saved
    db.session.commit()
    return jsonify(agreement.serialize()), 200


#GET: list of Candidatures
@api.route("/candidatures", methods=["GET"])
def get_candidatures():
    stmt = select(Candidature)
    candidatures = db.session.execute(stmt).scalars().all()
    return jsonify([candidature.serialize() for candidature in candidatures]), 200

#GET: Candidature by id
@api.route("/candidatures/<int:id>", methods=["GET"])
def get_candidature(id):
    stmt = select(Candidature).where(Candidature.id == id)
    candidature = db.session.execute(stmt).scalar_one_or_none()
    if candidature is None:
        return jsonify({"error": "Candidature not found"}), 404
    #No need for loop as it returns one object
    return jsonify(candidature.serialize()), 200

# POST: Add new Candidature
@api.route("/candidatures", methods=["POST"])
def create_candidature():
    #extraemos la informacion del body puede ser con request.json
    data = request.get_json()
        
    try:
        new_candidature = Candidature(
            candidature_date=data["candidature_date"],
            candidature_message=data["candidature_message"],
            candidature_status=data["candidature_status"],
            client_id=data["client_id"],
            post_id=data["post_id"],
            professional_id=data["professional_id"],            
        )
        db.session.add(new_candidature)  
        db.session.commit()
        return jsonify(new_candidature.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#PUT: Modify Candidature
@api.route("/candidatures/<int:id>", methods=["PUT"]) #Dynamic route
def update_candidature(id):
    #Extraction of data from body
    data = request.get_json()
    stmt = select(Candidature).where(Candidature.id == id)
    candidature = db.session.execute(stmt).scalar_one_or_none()
    #If candidature does not exist:
    if candidature is None:
        return jsonify({"error": "Candidature not found"}), 404
    
    #Modification of properties of object
    candidature.candidature_message = data.get("candidature_message", candidature.candidature_message)
    
    #Changes saved
    db.session.commit()
    return jsonify(candidature.serialize()), 200

#GET: list of Ratings
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
    #No need for loop as it returns one object 
    return jsonify(rating.serialize()), 200

# POST: Add new Rating
@api.route("/ratings", methods=["POST"])
def create_rating():
    #extraemos la informacion del body puede ser con request.json
    data = request.get_json()
        
    try:
        new_rating = Rating(
            client_id=data["client_id"],
            professional_id=data["professional_id"],
            rating_professional=data["rating_professional"],            
        )
        db.session.add(new_rating)  
        db.session.commit()
        return jsonify(new_rating.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#GET: list of Comments
@api.route("/comments", methods=["GET"])
def get_comments():
    stmt = select(Rating)
    comments = db.session.execute(stmt).scalars().all()
    return jsonify([comment.serialize() for comment in comments]), 200

# GET: Comment by id
@api.route("/comments/<int:id>", methods=["GET"])
def get_comment(id):
    stmt = select(Comment).where(Comment.id == id)
    comment = db.session.execute(stmt).scalar_one_or_none()
    if comment is None: 
        return jsonify({"error": "Comment not found"}), 404
    #No need for loop as it returns one object 
    return jsonify(comment.serialize()), 200

# POST: Add new Comment
@api.route("/comments", methods=["POST"])
def create_comment():
    #extraemos la informacion del body puede ser con request.json
    data = request.get_json()
        
    try:
        new_comment = Comment(
            client_id=data["client_id"],
            comment_text=data["comment_text"],
            professional_id=data["professional_id"],            
        )
        db.session.add(new_comment)  
        db.session.commit()
        return jsonify(new_comment.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#PUT: Modify Comment
@api.route("/comments/<int:id>", methods=["PUT"]) #Dynamic route
def update_comment(id):
    #Extraction of data from body
    data = request.get_json()
    stmt = select(Comment).where(Comment.id == id)
    comment = db.session.execute(stmt).scalar_one_or_none()
    #If comment does not exist:
    if comment is None:
        return jsonify({"error": "Comment not found"}), 404
    
    #Modification of properties of object
    comment.comment_text = data.get("comment_text", comment.comment_text)
    
    #Changes saved
    db.session.commit()
    return jsonify(comment.serialize()), 200

#GET: list of Payments
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
    #No need for loop as it returns one object 
    return jsonify(payment.serialize()), 200

#PUT: Modify Payment - MAY NOT BE REQUIRED DEPENDING ON WHETHER WE USE SOME VALIDATION IN THE FRONT END
@api.route("/payments/<int:id>", methods=["PUT"]) #Dynamic route
def update_payment(id):
    #Extraction of data from body
    data = request.get_json()
    stmt = select(Payment).where(Payment.id == id)
    payment = db.session.execute(stmt).scalar_one_or_none()
    #If payment does not exist:
    if payment is None:
        return jsonify({"error": "Payment not found"}), 404
    
    #Modification of properties of object
    payment.payment_amount = data.get("payment_amount", payment.payment_amount)
    
    #Changes saved
    db.session.commit()
    return jsonify(payment.serialize()), 200


#GET: list of Premiums
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
    #No need for loop as it returns one object 
    return jsonify(premium.serialize()), 200

#PUT: Modify Premium 
@api.route("/premiums/<int:id>", methods=["PUT"]) #Dynamic route
def update_premium(id):
    #Extraction of data from body
    data = request.get_json()
    stmt = select(Premium).where(Premium.id == id)
    premium = db.session.execute(stmt).scalar_one_or_none()
    #If premium does not exist:
    if premium is None:
        return jsonify({"error": "Premium not found"}), 404
    
    #Modification of properties of object
    premium.auto_renewal = data.get("auto_renewal", premium.auto_renewal)
    premium.expiration_date = data.get("expiration_date", premium.expiration_date)
    premium.premium_types = data.get("premium_types", premium.premium_types)
    premium.renewal_date = data.get("renewal_date", premium.renewal_date)

    #Changes saved
    db.session.commit()
    return jsonify(premium.serialize()), 200

#GET: list of Categories
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
    #No need for loop as it returns one object 
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
    #Extraction of data from body
    data = request.get_json()
    stmt = select(Category).where(Category.id == id)
    category = db.session.execute(stmt).scalar_one_or_none()
    #If category does not exist:
    if category is None:
        return jsonify({"error": "Category not found"}), 404
    
    #Modification of properties of object
    category.name = data.get("name", category.name)
    
    #Changes saved 
    db.session.commit()
    return jsonify(category.serialize()), 200