# seed.py
import random
from datetime import datetime
from faker import Faker
from sqlalchemy.exc import IntegrityError
from app import app, db
from api.models import (
    User, Client, Professional, Category, Post,
    Candidature, Agreement, Rating, Comment, Payment, Premium,
    CandidatureStatus, PremiumType, RatingValue
)
# modulo que se tiene que instalar!
fake = Faker()


def seed_users():
    print("Seeding users...")
    users = []
    for i in range(20):  # 20 users (10 clients + 10 professionals)
        user = User(
            email=fake.unique.email(),
            password=fake.password(),
            is_professional=(i >= 10),  # First 10 are clients
            registration_date=fake.date_time_this_year(),
            firstname=fake.first_name(),
            lastname1=fake.last_name(),
            lastname2=fake.last_name(),
            address_street=fake.street_address(),
            address_city=fake.city(),
            address_postcode=fake.postcode(),
            address_county=fake.state(),
            address_country=fake.country(),
            tax_number=fake.unique.random_number(digits=10),
            geo_dir=f"{fake.latitude()}, {fake.longitude()}",
            active_user=fake.boolean()
        )
        users.append(user)
        db.session.add(user)
    db.session.commit()
    return users


def seed_clients(users):
    print("Seeding clients...")
    clients = []
    for user in users[:10]:  # First 10 users are clients
        client = Client(user_id=user.id)
        clients.append(client)
        db.session.add(client)
    db.session.commit()
    return clients


def seed_professionals(users):
    print("Seeding professionals...")
    professionals = []
    for user in users[10:]:  # Last 10 users are professionals
        professional = Professional(
            user_id=user.id,
            prof_experience=fake.text(max_nb_chars=5000),
            prof_url=fake.unique.url(),
            is_premium=fake.boolean()
        )
        professionals.append(professional)
        db.session.add(professional)
    db.session.commit()
    return professionals


def seed_categories():
    print("Seeding categories...")
    categories = []
    for _ in range(10):
        category = Category(name=fake.word().capitalize())
        categories.append(category)
        db.session.add(category)
    db.session.commit()
    return categories


def seed_posts(clients, categories):
    print("Seeding posts...")
    posts = []
    for _ in range(10):
        post = Post(
            remote_project=fake.boolean(),
            project_city=fake.city(),
            project_county=fake.state(),
            project_country=fake.country(),
            post_description=fake.text(max_nb_chars=500),
            estimated_budged=str(fake.random_number(digits=5)),
            post_open=fake.boolean(),
            post_active=fake.boolean(),
            post_completed=fake.boolean(),
            post_date=fake.date_time_this_year(),
            client_id=random.choice(clients).id,
            category_id=random.choice(categories).id
        )
        posts.append(post)
        db.session.add(post)
    db.session.commit()
    return posts


def seed_candidatures(posts, professionals, clients):
    print("Seeding candidatures...")
    candidatures = []
    for _ in range(10):
        candidature = Candidature(
            candidature_message=fake.text(max_nb_chars=500),
            candidature_date=fake.date_time_this_year(),
            candidature_status=random.choice(list(CandidatureStatus)),
            post_id=random.choice(posts).id,
            professional_id=random.choice(professionals).id,
            client_id=random.choice(clients).id
        )
        candidatures.append(candidature)
        db.session.add(candidature)
    db.session.commit()
    return candidatures


def seed_agreements(candidatures):
    print("Seeding agreements...")
    agreements = []
    for candidature in candidatures:
        agreement = Agreement(
            agreement_date=fake.date_time_this_year(),
            agreement_status=fake.boolean(),
            candidature_id=candidature.id,
            post_id=candidature.post_id,
            professional_id=candidature.professional_id,
            client_id=candidature.client_id
        )
        agreements.append(agreement)
        db.session.add(agreement)
    db.session.commit()
    return agreements


def seed_ratings(professionals, clients):
    print("Seeding ratings...")
    ratings = []
    for _ in range(10):
        rating = Rating(
            rating_professional=random.choice(list(RatingValue)),
            professional_id=random.choice(professionals).id,
            client_id=random.choice(clients).id
        )
        ratings.append(rating)
        db.session.add(rating)
    db.session.commit()
    return ratings


def seed_comments(professionals, clients):
    print("Seeding comments...")
    comments = []
    for _ in range(10):
        comment = Comment(
            comment_text=fake.text(max_nb_chars=300),
            professional_id=random.choice(professionals).id,
            client_id=random.choice(clients).id
        )
        comments.append(comment)
        db.session.add(comment)
    db.session.commit()
    return comments


def seed_payments(professionals):
    print("Seeding payments...")
    payments = []
    for _ in range(10):
        payment = Payment(
            payment_amount=round(random.uniform(50, 500), 2),
            payment_date=fake.date_time_this_year(),
            professional_id=random.choice(professionals).id
        )
        payments.append(payment)
        db.session.add(payment)
    db.session.commit()
    return payments


def seed_premiums(professionals):
    print("Seeding premiums...")
    premiums = []
    for _ in range(10):
        premium = Premium(
            renewal_date=fake.date_time_this_year(),
            expiration_date=fake.date_time_this_year(),
            auto_renewal=fake.boolean(),
            premium_types=random.choice(list(PremiumType)),
            professional_id=random.choice(professionals).id
        )
        premiums.append(premium)
        db.session.add(premium)
    db.session.commit()
    return premiums


def main():
    with app.app_context():
        # Reset database
        db.drop_all()
        db.create_all()

        # Seed data in dependency order
        users = seed_users()
        clients = seed_clients(users)
        professionals = seed_professionals(users)
        categories = seed_categories()
        posts = seed_posts(clients, categories)
        candidatures = seed_candidatures(posts, professionals, clients)
        agreements = seed_agreements(candidatures)
        ratings = seed_ratings(professionals, clients)
        comments = seed_comments(professionals, clients)
        payments = seed_payments(professionals)
        premiums = seed_premiums(professionals)

        print("✅ Database seeded successfully!")


if __name__ == "__main__":
    main()
