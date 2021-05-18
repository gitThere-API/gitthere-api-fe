import React from 'react';
import BasicMarkerLime from '../Map/BasicMarkerLime';
import BasicMarkerNike from '../Map/BasicMarkerNike';
import BasicMarkerSpin from '../Map/BasicMarkerSpin';
import BasicMarkerTriMet from '../Map/BasicMarkerTriMet';

function Legend() {
  return (
      <div className="legend">
        <div className="single-icon">
            <a href="https://apps.apple.com/us/app/biketownpdx/id1132076989">
                <div className="legend-icon-nike">
                    <BasicMarkerNike />
                </div>
                Nike
            </a>
        </div>
        <a href="https://apps.apple.com/us/app/spin-electric-scooters/id1241808993">
            <div className="single-icon">
                <BasicMarkerSpin />Spin
                </div>
        </a>
        <div className="single-icon">
            <a href="https://apps.apple.com/us/app/lime-your-ride-anytime/id1199780189">
                <div className="legend-icon-lime">
                    <BasicMarkerLime />
                </div>
                Lime
            </a>
        </div>
        <a href="https://trimet.org/#/planner">
            <div className="single-icon">
                <BasicMarkerTriMet />Trimet
                </div>
        </a>
    </div>
  )
}

export default Legend;
