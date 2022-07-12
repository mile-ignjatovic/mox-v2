import Table from 'react-bootstrap/Table'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Checkbox } from '../Checkbox/Checkbox';

const URLTable = (props) => { 
  const { data } = props;
  const handleCheckbox = (value, item) => {
    if (value !== item.isEnabled) {
      const checkboxData = {key: item.key, enable: value};
      fetch('http://localhost:3000/admin/mocks', { 
        method: 'PUT', 
        body: JSON.stringify(checkboxData), 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then(() => props.onCheckboxUpdate());
    }
  }
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>URL path</th>
            <th>Status code</th>
            <th>Status message</th>
            <th>Mocked</th>
            <th>Mock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={item.status !== '200' ? 'urlBadRequest' : ''}>
              <td>{item.url}</td>
              <td>{item.status}</td>
              <td>{item.description}</td>
              <td>{item.isEnabled === true ? 'Yes' : 'No'}</td>
              <td className='mockButton'>
                <Checkbox value={item.isEnabled} item={item} handleCheckbox={handleCheckbox}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export { URLTable };