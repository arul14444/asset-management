import './App.css';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <div className="form-loaning m-5">
            <h2>Loaning Request Form</h2>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Masukan alasan peinjaman" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Masukan alasan peinjaman" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Asset</Form.Label>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Please select the asset to be borrowed</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Note</Form.Label>
                    <Form.Control type="text" placeholder="Please provide the reason for the loan" />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </Form>
        </div>
  );
}

export default App;
