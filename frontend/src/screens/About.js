import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="container_about">
      <header>
        {/* Add your header content here */}
      </header>
      <main>
        <h1>About ShiftOrganizer Synchronizer 2024</h1>
        <p>
          ShiftOrganizer Synchronizer 2024 is an unofficial application crafted by Raul Asadov. Our mission is to streamline and enhance the shift organizing experience by enabling synchronization across multiple users and various places of work.
        </p>
        <p>
          In a dynamic work environment where teams operate across different locations, our application facilitates the synchronization of shifts, making collaboration and coordination seamless. By leveraging advanced technologies, ShiftOrganizer Synchronizer 2024 empowers users to efficiently manage and organize their work schedules, ensuring optimal coverage and minimizing scheduling conflicts.
        </p>
        <p>
          Key Features:
          <ul>
            <li>Multi-User Synchronization: Connect and synchronize shifts from two or more users across different workplaces.</li>
            <li>User-Friendly Interface: Enjoy an intuitive interface designed for ease of use, allowing users to effortlessly navigate and manage their shift data.</li>
          </ul>
        </p>
        <p>
          Join us in revolutionizing the way shifts are organized and synchronized. ShiftOrganizer Synchronizer 2024 is not just a tool; it's a commitment to enhancing workplace efficiency and collaboration.
        </p>
      </main>
      <footer>
        <p className="col-md-4 mb-0 text-muted">ShiftOrganizer Synchonizer 2024 unofficial</p>
        <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
        </a>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Home</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default About;
