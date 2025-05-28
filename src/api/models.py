from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey,DateTime, Enum, Float, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
import enum

db = SQLAlchemy()

class User(db.Model): 
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_professional: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    registration_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now())
    firstname: Mapped[str] = mapped_column(String(50), nullable=False)
    lastname1: Mapped[str] = mapped_column(String(50), nullable=False)
    lastname2: Mapped[str] = mapped_column(String(50), nullable=True)  
    address_street: Mapped[str] = mapped_column(String(50), nullable=False)
    address_city: Mapped[str] = mapped_column(String(50), nullable=False)
    address_postcode: Mapped[str] = mapped_column(String(20), nullable=False)
    address_county: Mapped[str] = mapped_column(String(50), nullable=False)
    address_country: Mapped[str] = mapped_column(String(50), nullable=False)
    tax_number: Mapped[str] = mapped_column(String(15), nullable=False)
    geo_dir: Mapped[str] = mapped_column(String(50), nullable=False)

    #Relationships with other tables
    client: Mapped["Client"] = relationship(back_populates="user", uselist=False) #one to one -CHECK BACKPOPULATES "users" (que es lo que esta populating) y Singular/plural
    professional: Mapped["Professional"] = relationship(back_populates="user", uselist=False) #One to one
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,  # REMOVE IN PRODUCTION
            "is_professional": self.is_professional,
            "registration_date": self.registration_date.isoformat() if self.registration_date else None,
            "firstname": self.firstname,
            "lastname1": self.lastname1,
            "lastname2": self.lastname2,
            "address_street": self.address_street,
            "address_city": self.address_city,
            "address_postcode": self.address_postcode,
            "address_county": self.address_county,
            "address_country": self.address_country,
            "tax_number": self.tax_number,
            "geo_dir": self.geo_dir,
            # Relationships
            "client": self.client.serialize() if self.client else None,
            "professional": self.professional.serialize() if self.professional else None
        }
    

class Client(db.Model): 
    __tablename__ = "clients"
    id: Mapped[int] = mapped_column(primary_key=True)

    #connection with foreign keys
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id")) #one to one relationship. foreign key in client only
    

    #relationships
    user: Mapped["User"] = relationship(back_populates="client") #one to one
    posts: Mapped[list["Post"]] = relationship(back_populates="client") #one client to many post
    ratings: Mapped[list["Rating"]] = relationship(back_populates="client") #one client to many ratings
    agreements: Mapped[list["Agreement"]] = relationship(back_populates="client") #one to many
    comments: Mapped[list["Comment"]] = relationship(back_populates="client") #one client to many comments

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "user": self.user.serialize() if self.user else None,
            "posts": [p.serialize() for p in self.post],  # Serialize list of posts
            "ratings": [r.serialize() for r in self.ratings],
            "comments": [c.serialize() for c in self.comments]
        }
        
class Professional(db.Model): #reviewed
    __tablename__ = "professionals"
    id: Mapped[int] = mapped_column(primary_key=True)   
    prof_experience: Mapped[str] = mapped_column(String(5000), nullable=False)
    prof_url: Mapped[str] = mapped_column(String(80), nullable=True, unique=True)
    is_premium: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    #RATING? Tabla separada (muchos a muchos). Enlace professional y cliente (DONE)

    #connection with foreign keys
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id")) #one to one relationship. foreign key in client only

    #relationships
    user: Mapped["User"] = relationship(back_populates="professional") #one to one
    payments: Mapped[list["Payment"]] = relationship(back_populates="professional")
    premiums: Mapped[list["Premium"]] = relationship(back_populates="professional") #one to many (as there may be historic data)
    ratings: Mapped[list["Rating"]] = relationship(back_populates="professional", cascade="all, delete-orphan")
    candidatures: Mapped[list["Candidature"]] = relationship(back_populates="professional") #one to many
    agreements: Mapped[list["Agreement"]] = relationship(back_populates="professional") #one to many
    comments: Mapped[list["Comment"]] = relationship(back_populates="professional") #one to many
   
    @property
    def average_rating(self):
        #Returns the average rating (float) for this professional, or None if no ratings. 
        values = [rating.rating_professional.value for rating in self.ratings]
        return sum(values) / len(values) if values else None
    
    def serialize(self):
        return {
            "id": self.id,
            "prof_experience": self.prof_experience,
            "prof_url": self.prof_url,
            "is_premium": self.is_premium,
            "user_id": self.user_id,
            "ratings": [r.rating_professional.value for r in self.ratings],
            "average_rating": self.average_rating   
        }

class Rating_value(enum.Enum):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5
    
class Rating(db.Model): #many-to-many relationship between Professional and Client through the Rating association table. Each Rating links to one Prof and one Client.
    __tablename__= "ratings"
    id: Mapped[int] = mapped_column(primary_key=True)
    rating_professional: Mapped[Rating_value] = mapped_column(Enum(Rating_value), nullable=False)
    
    #connection with foreign keys
    professional_id: Mapped[int] = mapped_column(ForeignKey("professionals.id")) #one to many
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id")) #one to many

    #relationships
    professional: Mapped["Professional"] = relationship(back_populates="ratings") #one to many
    client: Mapped["Client"] = relationship(back_populates="ratings") #one to many

    def serialize(self):
        return {
            "id": self.id,
            "rating_professional": self.rating_professional.value,  # Returns the integer value
            "professional_id": self.professional_id,
            "client_id": self.client_id,
            "professional": self.professional.serialize() if self.professional else None,
            "client": self.client.serialize() if self.client else None      
        }

class Comment(db.Model):
    __tablename__="comments"
    id: Mapped[int] = mapped_column(primary_key=True)
    comment_text: Mapped[str] = mapped_column(String(300), nullable=True) #left as nullable as writing a comment should not be compulsory

    #connection with foreign keys
    professional_id: Mapped[int] = mapped_column(ForeignKey("professionals.id")) #one to many
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id")) #one to many

    #relationships
    professional: Mapped["Professional"] = relationship(back_populates="comments") #each comment assigned to one professional
    client: Mapped["Client"]= relationship(back_populates="comments") #each comment belongs to one client

    def serialize(self):
        return {
            "id": self.id,
            "comment_text": self.comment_text,
            "professional_id": self.professional_id,
            "client_id": self.client_id,
            "professional": self.professional.serialize() if self.professional else None,
            "client": self.client.serialize() if self.client else None   
        }
    
class Payment(db.Model):
    __tablename__ = "payments"
    id: Mapped[int] = mapped_column(primary_key=True) 
    payment_amount: Mapped[float] = mapped_column(Float, nullable=False) #All payments in same currency (EUR) for simplicity
    payment_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now())

    #connection with foreign key
    professional_id: Mapped[int] = mapped_column(ForeignKey("professionals.id")) #as one to many 

    #relationship with Professional
    professional: Mapped["Professional"] = relationship(back_populates="payments") #one to many


    def serialize(self):
        return {
            "id": self.id,
            "payment_amount": self.payment_amount,
            "payment_date": self.payment_date.isoformat() if self.payment_date else None,
            "professional_id": self.professional_id      
        }
      
class Premium_type(enum.Enum):
    FREE = 1
    BASIC = 2
    STANDARD = 3
    PLUS = 4
    
class Premium(db.Model):
    __tablename__ = "premiums"
    id: Mapped[int] = mapped_column(primary_key=True) 
    renewal_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now())
    expiration_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now())
    auto_renewal: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    premium_types: Mapped[Premium_type] = mapped_column(Enum(Premium_type), nullable=False)
    
    #connection with foreign key
    professional_id: Mapped[int] = mapped_column(ForeignKey("professionals.id")) #one to many (historic data)

    #relationships
    professional: Mapped["Professional"] = relationship(back_populates="premiums") #one professional to many premiums

    def serialize(self):
        return {
            "id": self.id,
            "renewal_date": self.renewal_date.isoformat() if self.renewal_date else None,
            "expiration_date": self.expiration_date.isoformat() if self.expiration_date else None,
            "auto_renewal": self.auto_renewal,
            "premium_types": self.premium_types.value if self.premium_types else None,
            "professional_id": self.professional_id,
            "professional": self.professional.id if self.professional else None #avoids recursion
        }
         
class Post(db.Model):
    __tablename__ = "posts"
    id: Mapped[int] = mapped_column(primary_key=True) 
    remote_project: Mapped[bool] = mapped_column(Boolean(), nullable=False)  
    project_city: Mapped[str] = mapped_column(String(50), nullable=False)
    project_county: Mapped[str] = mapped_column(String(50), nullable=False)
    project_country: Mapped[str] = mapped_column(String(50), nullable=False)
    post_description: Mapped[str] = mapped_column(String(500), nullable=False) 
    estimated_budged: Mapped[str] = mapped_column(String(100), nullable=True)
    post_open: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    post_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    post_completed: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    post_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now())
 
    #connection with foreign key 
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id")) #Foreign key as relationship one client to many post
    cathegory_id: Mapped[int] = mapped_column(ForeignKey("cathegories.id"))
    
    #relationships 
    client: Mapped["Client"] = relationship(back_populates="posts") #one to many
    agreement: Mapped["Agreement"] = relationship(back_populates="post, uselist=False") #one to one
    candidatures: Mapped[list["Candidature"]] = relationship(back_populates="post") #many to one
    cathegory: Mapped["Cathegory"] = relationship(back_populates="posts") #one to many


    def serialize(self):
        return {
            "id": self.id,
            "remote_project": self.remote_project,
            "project_city": self.project_city,
            "project_county": self.project_county,
            "project_country": self.project_country,
            "post_description": self.post_description,
            "estimated_budged": self.estimated_budged,
            "post_open": self.post_open,
            "post_active": self.post_active,
            "post_completed": self.post_completed,
            "post_date": self.post_date.isoformat() if self.post_date else None,
            "client_id": self.client_id,
            "cathegory_id": self.cathegory_id,
            "client": self.client.serialize() if self.client else None,
            "agreement": self.agreement.serialize() if self.agreement else None,
            "candidatures": [c.serialize() for c in self.candidatures],
            "cathegory": self.cathegory.serialize() if self.cathegory else None            
        }      

class Agreement(db.Model):
    __tablename__ = "agreements"
    id: Mapped[int] = mapped_column(primary_key=True) 
    agreement_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now(), nullable=False)
    agreement_status: Mapped[bool] = mapped_column(Boolean(), nullable=False) #discussed with Javier

    #connection with foreign key
    candidature_id: Mapped[int] = mapped_column(ForeignKey("candidatures.id"))
    post_id: Mapped[int] = mapped_column(ForeignKey("posts.id"))
    professional_id: Mapped[int] = mapped_column(ForeignKey("professionals.id")) #as one to many
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id")) #as one to many

    #relationships
    candidature: Mapped["Candidature"] = relationship(back_populates="agreement") #one to one
    post: Mapped["Post"] = relationship(back_populates="agreement", uselist=False) #one to one
    professional: Mapped["Professional"] = relationship(back_populates="agreements") #many to one
    client: Mapped["Client"] = relationship(back_populates="agreements") #many to one

    def serialize(self):
        return {
            "id": self.id,
            "agreement_date": self.agreement_date.isoformat() if self.agreement_date else None,
            "agreement_status": self.agreement_status,
            "candidature_id": self.candidature_id,
            "post_id": self.post_id,
            "professional_id": self.professional_id,
            "client_id": self.client_id,
            "candidature": self.candidature.serialize() if self.candidature else None,
            "post": self.post.serialize() if self.post else None,
            "professional": self.professional.serialize() if self.professional else None,
            "client": self.client.serialize() if self.client else None
        }    
    
class Candidature_status(enum.Enum):
    IN_PROCESS = 1
    ACCEPTED = 2
    REJECTED = 3
    
class Candidature(db.Model):
    __tablename__ = "candidatures"
    id: Mapped[int] = mapped_column(primary_key=True)
    candidature_message: Mapped[str] = mapped_column(String(500), nullable=False)
    candidature_date: Mapped[datetime] = mapped_column(DateTime(), default=datetime.now(), nullable=False)
    candidature_status: Mapped[Candidature_status] = mapped_column(Enum(Candidature_status), nullable=False)

    #connection with foreign key
    post_id: Mapped[int] = mapped_column(ForeignKey("posts.id"))
    agreement_id: Mapped[int]= mapped_column(ForeignKey("agreements.id"))
    professional_id: Mapped[int] = mapped_column(ForeignKey("professionals.id"))
    
    #relationships 
    post: Mapped["Post"] = relationship(back_populates="candidatures") #Scalar. Each candidature is linked to one post.
    agreement: Mapped["Agreement"] = relationship(back_populates="candidature")
    professional: Mapped["Professional"] = relationship(back_populates="candidatures")

    def serialize(self):
        return {
            "id": self.id,
            "candidature_message": self.candidature_message,
            "candidature_date": self.candidature_date.isoformat() if self.candidature_date else None,
            "candidature_status": self.candidature_status.value if self.candidature_status else None,
            "post_id": self.post_id,
            "professional_id": self.professional_id,
            "agreement_id": self.agreement_id,
            "post": self.post.serialize() if self.post else None,
            "professional": self.professional.serialize() if self.professional else None,
            "agreement": self.agreement.serialize() if self.agreement else None           
        }   

class Cathegory(db.Model): #Javier mentioned that we should only create table with main cathegories
    __tablename__ = "cathegories"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    #foreing key connection goes in the many side (Post)

    #relationships 
    posts: Mapped[list["Post"]] = relationship(back_populates="cathegory") #one cthegory to many posts

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "post_ids": [post.id for post in self.posts]
        }    
    
#CORREO ELECTRÓNICO COMO NOTIFICACION. JAVIER NOS AYUDARÁ A IMPLEMENTARLO.
