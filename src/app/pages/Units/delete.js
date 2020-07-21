import React from "react";
import UnitAction from '../../actions/units'
import Store from '../../store'
import {getDisabledPayload} from '../../utils/dataUtils'
function ViewCategory(props) {
    return (
      <React.Fragment>
        <div className="pl-3 pr-3">
            <dl className="dl-horizontal">
              <dt>Unit Name</dt>
              <dd>{props.record.name}</dd>
              <dt>Description</dt>
              <dd>{props.record.description}</dd>
              <dt>Unit Status</dt>
              <dd>
                {props.record.isActive
                  ? <label className="badge badge-success">Active</label>
                  : <label className="badge badge-warning">In Active</label>
                }
              </dd>
            </dl>
        </div>
        <hr className="modal-footer-ruler" />
        <div className="text-right">
          <button className="btn btn-light mr-2" onClick={() => {props.closeModal()}}>Close</button>
          <button className="btn btn-light mr-2" onClick={() => {
              Store.dispatch(UnitAction.updateData(getDisabledPayload(props.record)))
              props.closeModal()
          }} > Disable</button>
        </div>
      </React.Fragment>
    );
}

export default ViewCategory;
