export function Form({
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    choice,
    values,
    remaining,
  }) {
    return (
      <div className="Instructions">
        <h5>{choice === 'myself' && "Enter the allocations for various funds."}</h5>
        <h5>{choice === 'automated' && "Recommended allocations for various funds."}</h5>
        <br/>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group"  style={{"marginTop": "10px"}}>
          <span style={{"whiteSpace": "pre"}}>Fund A: </span>
              <input style={{width: 100}}
                type="number"
                id="fund-a-input"
                placeholder="0-100"
                value={values.a || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name="a"
                min="0"
                max="100"
                step={1}
              />%
              <div style={{color: 'red'}}>
                {errors.a}
              </div>
            
          </div>
          <div className="form-group" style={{"marginTop": "10px"}}>
          <span style={{"whiteSpace": "pre"}}>Fund B: </span>
              <input
              style={{width: 100}}
                type="number"
                id="fund-b-input"
                placeholder="0-100"
                value={values.b || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name="b"
                min="0"
                max="100"
                step={1}
              />%
              <div style={{color: 'red'}}>
              {errors.b}
              </div>
          </div>
          <div className="form-group" style={{"marginTop": "10px"}}>
          <span style={{"whiteSpace": "pre"}}>Fund C: </span>
              <input
              style={{width: 100}}
                type="number"
                id="fund-c-input"
                placeholder="0-100"
                value={values.c || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name="c"
                min="0"
                max="100"
                step={1}
              />%
              <div style={{color: 'red'}}>
              {errors.c}
              </div>
          </div>
          <div className="form-group"  style={{"marginTop": "10px"}}>
          <span style={{"whiteSpace": "pre"}}>Fund D: </span>
              <input
              style={{width: 100}}
                type="number"
                id="fund-d-input"
                placeholder="0-100"
                value={values.d || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                name="d"
                min="0"
                max="100"
                step={1}
              />%
              <div style={{color: 'red'}}>
              {errors.d}
              </div>
          </div>
          <br/>
          <div>
            Remaining = {remaining}%
          </div>
          <br/>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={remaining}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }