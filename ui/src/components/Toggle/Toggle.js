import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'; 
import ToggleButton from 'react-bootstrap/ToggleButton'; 

const Toggle = () => {
    const [recordMode, setRecordMode] = useState(true);

    const getConf = () => {
        fetch('http://localhost:3000/admin/conf', { 
            method: 'GET', 
            mode: 'cors'
        }).then(response => response.json()).then(data => {
            setRecordMode(!!data.result.recordMode);
        });
    }

    useEffect(() => {
        getConf();
      }, []);

    const updateRecordMode = (value) => {
        fetch('http://localhost:3000/admin/conf', {
            method: 'POST', 
            body: JSON.stringify({ recordMode: value }), 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            }).then(response => response.json()).then(data => {
                if (data.status === 'ok') {
                    setRecordMode(value);
                }
          });
    }

    const radios = [
        { name: 'On', value: true },
        { name: 'Off', value: false },
      ];

    return <ButtonGroup className="mb-2">
    {radios.map((radio, idx) => (
        <div>
            <ToggleButton
                className={'mx-2'}
                size="sm"
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-danger' : 'outline-success'}
                name="radio"
                value={radio.value}
                checked={recordMode === radio.value}
                onChange={() => updateRecordMode(radio.value)}
            
            >
                {radio.name}
            </ToggleButton>
        </div>
    ))}
    </ButtonGroup>
}

export default Toggle;