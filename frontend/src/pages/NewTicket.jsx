import { useState } from 'react';
import { useSelector } from 'react-redux';



function NewTicket() {
  // get user from globalstate with redux useSelector
  const { user } = useSelector((state) => state.auth);

  // set local state
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');



  const onSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <>
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input value={name} type="text" className="form-control" disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input value={email} type="text" className="form-control" disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              onChange={(e) => setProduct(e.target.value)}
              name="product"
              id="product"
              value={product}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of Issue</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket;