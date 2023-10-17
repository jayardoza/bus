import { useState, useEffect } from 'react';
import Sales from './Sales';
import PassengerList from './PassengerList';

function BusQueues() {
  const [passengers, setPassengers] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [totalSales, setTotalSales] = useState(0);
  
  const [bus1Queue, setBus1Queue] = useState([]);
  const [bus2Queue, setBus2Queue] = useState([]);
  const [bus3Queue, setBus3Queue] = useState([]);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/troy1129/jsonplaceholder/passengers')
      .then((response) => response.json())
      .then((data) => {
        setPassengers(data);
      })
      .catch((error) => {
        console.error('Error fetching passengers:', error);
      });

    fetch('https://my-json-server.typicode.com/troy1129/jsonplaceholder/destinations')
      .then((response) => response.json())
      .then((data) => {
        setDestinations(data);
      })
      .catch((error) => {
        console.error('Error fetching destinations:', error);
      });
  }, []);
  
  const moveToBus = (passenger, destinationName) => {
    const destination = destinations.find((dest) => dest.destination === destinationName);
  
    if (destination) {
      if (destinationName === 'Cebu' || destinationName === 'Mandaue') {
        if (bus1Queue.includes(passenger)) {
          setBus1Queue(bus1Queue.filter((p) => p.id !== passenger.id));
        } else if (bus1Queue.length < 5) {
          setBus1Queue([...bus1Queue, passenger]);
          setPassengers(passengers.filter((p) => p.id !== passenger.id));
          setTotalSales(totalSales + destination.price); 
        }
      } else if (destinationName === 'Lilo-an' || destinationName === 'Lapu-Lapu') {
        if (bus2Queue.includes(passenger)) {
          setBus2Queue(bus2Queue.filter((p) => p.id !== passenger.id));
        } else if (bus2Queue.length < 5) {
          setBus2Queue([...bus2Queue, passenger]);
          setPassengers(passengers.filter((p) => p.id !== passenger.id));
          setTotalSales(totalSales + destination.price); 
        }
      } else if (destinationName === 'Consolacion' || destinationName === 'Talisay') {
        if (bus3Queue.includes(passenger)) {
          setBus3Queue(bus3Queue.filter((p) => p.id !== passenger.id));
        } else if (bus3Queue.length < 5) {
          setBus3Queue([...bus3Queue, passenger]);
          setPassengers(passengers.filter((p) => p.id !== passenger.id));
          setTotalSales(totalSales + destination.price); 
        }
      }
    }
  };
  
  const removeFromQueue = (queue, passenger, setQueue) => {
    const updatedQueue = queue.filter((p) => p.id !== passenger.id);
    setQueue(updatedQueue);
  };
  
  
  
  return (
    <div>
      <Sales totalSales={totalSales} />
      <PassengerList passengers={passengers} destinations={destinations} moveToBus={moveToBus} />

      <div className="bus-queue-title">Bus Queues</div>
      <div className="bus-queue-container">
        <div className="bus-queue">
          <div className="queue">
            <h3>Bus 1</h3>
            <ul className="passenger-list">
              {bus1Queue.map((passenger) => (
                <li key={passenger.id}>
                  Name: {passenger.name}
                  <br />
                  Ticket ID: {passenger.id}
                  <br />
                  Destination: Cebu - Mandaue
                  <button onClick={() => removeFromQueue(bus1Queue, passenger, setBus1Queue)}>
                    Remove from Queue
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="queue">
            <h3>Bus 2</h3>
            <ul className="passenger-list">
              {bus2Queue.map((passenger) => (
                <li key={passenger.id}>
                  Name: {passenger.name}
                  <br />
                  Ticket ID: {passenger.id}
                  <br />
                  Destination: Lilo-an - Lapu-Lapu
                  <button onClick={() => removeFromQueue(bus2Queue, passenger, setBus2Queue)}>
                    Remove from Queue
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="queue">
            <h3>Bus 3</h3>
            <ul className="passenger-list">
              {bus3Queue.map((passenger) => (
                <li key={passenger.id}>
                  Name: {passenger.name}
                  <br />
                  Ticket ID: {passenger.id}
                  <br />
                  Destination: Consolacion - Talisay
                  <button onClick={() => removeFromQueue(bus3Queue, passenger, setBus3Queue)}>
                    Remove from Queue
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusQueues;


