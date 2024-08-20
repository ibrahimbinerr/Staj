import { useState } from 'react';
import './App.css';
import editicon from "../images/edit.png"

function App() {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    tc: '',
    phone: ''
  });

  const [editData, setEditData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    tc: '',
    phone: ''
  });

  const [tableData, setTableData] = useState([]);
  const [currentId, setCurrentId] = useState(1);
  const [isIdAdded, setIsIdAdded] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId]= useState(0);

  const handleAddId = () => {
    if (!isIdAdded) {
      setFormData({
        ...formData,
        id: currentId
      });
      setCurrentId(currentId + 1); // ID'yi bir artır
      setIsIdAdded(true); // Butonu devre dışı bırak
      setError(''); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isIdAdded) {
      setError('*Lütfen önce bir ID oluşturun.');
      return;
    }
    setTableData([...tableData, formData]);
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      tc: '',
      phone: ''
    });
    setIsIdAdded(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTableData = tableData.map((item) =>
      item.id === editData.id ? editData : item
    );
    setTableData(updatedTableData);
    //console.log("edited")
    setEditData({
      id: '',
      firstName: '',
      lastName: '',
      tc: '',
      phone: ''
    });
  };

  const handleEdit = (data) => {
    setEditData(data);
  };

  const handleDelete = (id) => {
    const filteredTableData = tableData.filter((item) => item.id !== id);
    setTableData(filteredTableData);
  };
  
  const searchDelete = (e)=>{
    const filteredTableData = tableData.filter((item) => item.id != selectedId);
    setTableData(filteredTableData);
  }

  const handleIdChange=(e)=>{
    const {value} = e.target;
    setSelectedId(value)
  }
  const handleDeleteAll=(e)=>{
      const filteredTableData=[];
      setTableData(filteredTableData);
  }

  return (
    <div>
      <div className='header'>ankageo</div>
      <div className='forms'>
        <div className='card'>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <div className='idDiv'>    
          <span>{error ? (
              <span style={{ color: 'red', fontSize:'10px' }}>{error}</span> // Hata varsa hata mesajını göster
            ) : (
              formData.id !== '' && `${formData.id}` // Hata yoksa ID'yi göster
            )}</span> 
          <button type="button" onClick={handleAddId}>Oluştur</button>
          </div>
          
        </div>
        <div>
          <label htmlFor="firstName">Ad</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder='Adınızı Giriniz. *'
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Soyad</label>
          <input
            type="text"
            id="lastName"
            name="lastName"            
            required
            placeholder='Soyadınızı Giriniz. *'
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tc">TC</label>
          <input
            type="text"
            id="tc"
            name="tc"            
            required
            placeholder='TC Giriniz. *'
            value={formData.tc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Telefon</label>
          <input
            type="text"
            id="phone"
            name="phone"            
            placeholder='Telefon Giriniz.'
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Lütfen "*" alanları eksiksiz doldurunuz</label>
          <button type="submit">Gönder</button>
        </div>
        
      </form>
        </div>   
        <div className='card'>
        {!editData.id ? 
        <form onSubmit={handleEditSubmit}>
        <div>
          <label htmlFor="editId">ID</label>
          <input
            type="text"
            id="editId"
            name="id"              
            value={editData.id}
            onChange={handleEditChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="editFirstName">Ad</label>
          <input
            type="text"
            id="editFirstName"
            name="firstName"
            value={editData.firstName}
            onChange={handleEditChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="editLastName">Soyad</label>
          <input
            type="text"
            id="editLastName"
            name="lastName"
            value={editData.lastName}
            onChange={handleEditChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="editTc">TC</label>
          <input
            type="text"
            id="editTc"
            name="tc"
            value={editData.tc}
            onChange={handleEditChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="editPhone">Telefon</label>
          <input
            type="text"
            id="editPhone"
            name="phone"
            value={editData.phone}
            onChange={handleEditChange}
            readOnly
          />
        </div>
        <button type="submit" readOnly>Düzenle</button>
        </form>  
      : <form onSubmit={handleEditSubmit}>
      <div>
        <label htmlFor="editId">ID</label>
        <input
          type="text"
          id="editId"
          name="id"              
          value={editData.id}
          onChange={handleEditChange}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="editFirstName">A:</label>
        <input
          type="text"
          id="editFirstName"
          name="firstName"
          value={editData.firstName}
          onChange={handleEditChange}
        />
      </div>
      <div>
        <label htmlFor="editLastName">Soyad</label>
        <input
          type="text"
          id="editLastName"
          name="lastName"
          value={editData.lastName}
          onChange={handleEditChange}
        />
      </div>
      <div>
        <label htmlFor="editTc">TC</label>
        <input
          type="text"
          id="editTc"
          name="tc"
          value={editData.tc}
          onChange={handleEditChange}
        />
      </div>
      <div>
        <label htmlFor="editPhone">Telefon</label>
        <input
          type="text"
          id="editPhone"
          name="phone"
          value={editData.phone}
          onChange={handleEditChange}
        />
      </div>
      <button type="submit">Düzenle</button>
       </form>}

        </div>   
      
      </div>

      <div className="table-section">
      <div className='table-head'>
        <p>DATABASE</p>
        <div className='search'>
          <div>
          <input placeholder='ID' onChange={handleIdChange}/>
          {/* <span style={{ color: 'red', fontSize:'10px', visibility:"hidden" }}>{selectedId}</span> */}
          <button onClick={searchDelete}>Delete</button>
          <button onClick={handleDeleteAll}>DeleteAll</button>
          </div>         
          <span>Silmek istediğiniz verinin ID'sini giriniz</span>
        </div>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>NO</th>
            <th>ID</th>
            <th>AD</th>
            <th>SOYAD</th>
            <th>TC</th>
            <th>TELEFON</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.id}</td>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.tc}</td>
              <td>{data.phone}</td>
              <td>
                <button onClick={() => handleEdit(data)}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m21.561 5.318l-2.879-2.879A1.5 1.5 0 0 0 17.621 2c-.385 0-.768.146-1.061.439L13 6H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9l3.561-3.561c.293-.293.439-.677.439-1.061s-.146-.767-.439-1.06M11.5 14.672L9.328 12.5l6.293-6.293l2.172 2.172zm-2.561-1.339l1.756 1.728L9 15zM16 19H5V8h6l-3.18 3.18c-.293.293-.478.812-.629 1.289c-.16.5-.191 1.056-.191 1.47V17h3.061c.414 0 1.108-.1 1.571-.29c.464-.19.896-.347 1.188-.64L16 13zm2.5-11.328L16.328 5.5l1.293-1.293l2.171 2.172z"/></svg></button>
                <button onClick={() => handleDelete(data.id)}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg></button>
              </td>
              
                
              
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
}

export default App;
