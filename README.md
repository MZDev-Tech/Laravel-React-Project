
# Pet Adoption Platform - Laravel Backend

## Introduction

Welcome to the **Pet Adoption Platform**! This project was developed using **Laravel**, a powerful PHP framework, to handle the backend functionalities. The platform aims to facilitate the adoption of pets by providing users with an intuitive interface to browse pets, submit adoption requests, and complete the payment process. The backend uses **Laravel** to manage user authentication, adoption requests, and admin controls.

In this README, we’ll discuss the features of the platform and the technical implementation using Laravel & here you can watch the project video.

https://drive.google.com/file/d/10qbAqn9baqFhY1SvMu4hfNZoi7hf9pKz/view?usp=drive_link


## Features

### 1. **Register and Login**

- **Registration:** Users can create an account on the platform by providing necessary details.
- **Login:** Registered users can log in securely using their credentials. Authentication is managed using Laravel’s built-in features, including JWT tokens for secure session management.

### 2. **Home Page**

The **Home Page** serves as the central hub of the platform. Key sections include:
- **Navbar:** A navigation bar that makes it easy for users to access different pages within the site.
- **Categories:** A section that displays pet categories, helping users explore pets based on their preferences.
- **Pets:** A list of pets available for adoption, complete with essential information such as breed, age, and description.
- **Banners:** Promotional banners showcasing current offers or important information.
- **Feedback:** A section for users to leave feedback and reviews about the platform and their experience.
- **About Us:** An overview of the platform, its mission, and how it helps animals find new homes.


### 3. **Pets Page**

On the **Pets Page**, users can browse and filter pets based on various criteria like:
- Pet type (e.g., dogs, cats), Size, Age, breed, price range etc.

### 4. **About Page**

The **About Page** offers more information about the platform’s foundation and its mission. Key features include:
- **Videos of the Foundation:** Short clips that highlight the organization's work and impact in helping animals.


### 5. **Contact Page**

On the **Contact Page**, users can:
- **View a Map:** Interactive map showing the physical location of the organization.
- **Contact Form:** A form for users to submit inquiries or messages.
- **Address Details:** Information about the physical location and other ways to contact the organization.

### 6. **Adopt Form and Payment**

After logging in, users can fill out the **Adopt Form** to provide necessary details for adoption. Once the form is submitted, users are redirected to **Stripe** for secure payment processing. After completing the payment, users can track the status of their adoption request.

### 7. **Admin Panel**

The **Admin Panel** provides administrative users with full control over the platform:
- **Admin Login:** Admins can log in securely using their credentials, with JWT tokens ensuring safe and authenticated sessions.
- **Dashboard:** The dashboard displays key statistics and recent adoption requests, allowing admins to view real-time activity on the platform.
- **Manage Information:** Admins can manage users, pets, adoption requests, and more, directly from the dashboard.

---

## Laravel Integration

### 1. **Authentication**

Laravel’s built-in authentication system manages user registration and login. By utilizing Laravel’s **JWT (JSON Web Token)** authentication, users and admins can securely log in and maintain sessions across the platform.

### 2. **Database Management**

Laravel’s **Eloquent ORM** simplifies interactions with the database. The system is structured around several key models:
- **Users:** Managing both regular users and admins.
- **Pets:** Storing details about each pet available for adoption.
- **Adoption Requests:** Handling users' adoption requests and tracking their status.
- **Categories:** Storing categories of pets to make browsing easier.

### 3. **Payment Integration (Stripe)**

The Laravel backend integrates with **Stripe** to process payments for adoption fees. After completing the adoption form, users are redirected to Stripe’s payment gateway to complete their transaction.

### 4. **Admin Panel**

Admins use the **Admin Panel** to manage various aspects of the platform:
- **Adoption Requests:** Admins can review and approve requests, as well as track adoption statuses.
- **User Management:** Admins have the ability to manage user accounts and their data.
- **Pet Management:** Admins can add, update, or remove pets from the adoption pool.

---

## Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/MZDev-Tech/pet-adoption-laravel.git
cd pet-adoption-laravel
```

2. **Install Dependencies:**

Make sure you have Composer installed. Then, run the following command:

```bash
composer install
```

3. **Set Up Environment Variables:**

Edit the `.env` file to set up your database and other necessary configurations.

4. **Generate the Application Key:**

```bash
php artisan key:generate
```

5. **Migrate the Database:**

```bash
php artisan migrate
```

6. **Start the Development Server:**

```bash
php artisan serve
```

Now, you can access the application at `http://localhost:8000`.

---

## Contributing

We welcome contributions! If you have suggestions or improvements, feel free to fork the repository, make your changes, and submit a pull request.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to modify or add more specific details as per your project requirements!
