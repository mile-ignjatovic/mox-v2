import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './Input.css';

const Input = () => {
  return (
    <div className="inputDiv">
      <InputGroup size="sm" className="mb-3" width="200px">
        <InputGroup.Text id="inputGroup-sizing-sm">Filter URLs</InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </InputGroup>
    </div>
  );
}
export { Input };