import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.css';

const SubmitButton = (props) => {
  return (
    <div>
      <Button variant="danger" text={props.text} onClick={props.onClick} className='refreshBtn'>
        {props.text}
      </Button>
    </div>
  );
};

export { SubmitButton }