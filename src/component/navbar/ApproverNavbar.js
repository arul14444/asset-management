import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserCircle } from 'react-icons/fa'; // Ikon kepala orang

let ApproverNavbar = () => {
    return(
      <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#">Asset Management</Navbar.Brand>

        <Nav className="me-auto">
        </Nav>

        <Nav>
          <NavDropdown
            title={<FaUserCircle size={24} />}
            id="profile-dropdown"
            align="end"
          >
            <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
    );
}

export default ApproverNavbar