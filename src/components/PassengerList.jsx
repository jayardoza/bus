import React from 'react';

function PassengerList({ passengers, destinations, moveToBus }) {
  return (
    <div>
      <div className="passengers-title">Passenger</div>
      <div className="passengers-container">
        <ul>
          {passengers.map((passenger) => (
            <li key={passenger.id}>
              {passenger.name} - Ticket ID: {passenger.id}
              <div>
              <br></br>
                {destinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => moveToBus(passenger, destination.destination)}
                  >
                    {destination.destination}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PassengerList;
