import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import bgImage from '../assets/Photos/bg2.jpeg';


function EditProfile() {

  const styles = {
    container: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      padding: '20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      alignItems: 'center'
    },
    input: {
      margin: '10px 0',
      width: '80%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px'
    },
    label: {
      display: 'block',
      margin: '10px 0 5px'
    }
  };

  return (
    <>
<h2 style={{textAlign:'center'}}>Edit Your Profile</h2>
    <div style={styles.container }>
       
       <br/>

    <div>
        <Image src="holder.js/171x180" rounded/>
    </div>

    <div>
        <label style={styles.label}>Email</label>
        <input type="email" style={styles.input} />
      </div>
      <div>
        <label style={styles.label}>Name</label>
        <input type="text" style={{...styles.input, width: '70%'}} />
      </div>
      <div>
        <label style={styles.label}>More Details</label>
        <textarea style={styles.input} />
      </div>
      <div>
        <label style={styles.label}>Role</label>
        <input type="text" style={{...styles.input, width: '70%'}} />
      </div>
      <div>
      <lable>Edit Your Calendar</lable>
      </div>
      <div>
        <label style={styles.label}>Contact No</label>
        <input type="tel" style={{...styles.input, width: '70%'}} />
      </div> 
    </div>
    </>
  );
}

export default EditProfile;
