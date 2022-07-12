import './App.css';
import React, { useEffect, useState } from 'react';
import { URLTable } from './components/Table/Table';
import Toggle from './components/Toggle/Toggle';
import { Input } from './components/Input/Input';
import { SubmitButton } from './components/Button/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch('http://localhost:3000/admin/mocks').then(response => response.json()).then(data => {
      setData(data);
    });
  }
  
  return (
    <Container className='container'>
        <Row>
          <Col>
          <Input />          
          </Col>
          <Col>
            <Row md={2} flex>
              <Col>
                <SubmitButton text="Refresh" onClick={getData}>
                  Refresh
                </SubmitButton>
              </Col>
              <Col>
                Record mode: 
                <Toggle />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row >
          <URLTable data={data} onCheckboxUpdate={getData}/>
        </Row>
    </Container>

  );
}

export default App;
