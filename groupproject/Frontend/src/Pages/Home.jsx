import React from 'react';

export default function Home() {
  // Dummy data for instructor images and links
  const instructors = [
    { id: 'ins1', name: 'Instructor 1', imgSrc: 'path_to_image_1', link: 'link_to_page_1' },
    { id: 'ins2', name: 'Instructor 2', imgSrc: 'path_to_image_2', link: 'link_to_page_2' },
    { id: 'ins3', name: 'Instructor 3', imgSrc: 'path_to_image_3', link: 'link_to_page_3' },
    { id: 'ins4', name: 'Instructor 4', imgSrc: 'path_to_image_4', link: 'link_to_page_4' }
  ];

  const InstructorSelector = () => {
    return (
      <div style={styles.container}>
        <h1>Discover your ideal Instructor</h1>
        <p>Find your perfect instructor match for personalized guidance and support.</p>
        <div style={styles.instructorsContainer}>
          {instructors.map((instructor) => (
            <a key={instructor.id} href={instructor.link} style={styles.instructorLink}>
              <img src={instructor.imgSrc} alt={instructor.name} style={styles.instructorImage} />
              <span style={styles.instructorName}>{instructor.name}</span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const styles = {
    container: {
      textAlign: 'center',
      backgroundImage: 'url(path_to_background_image)',
      backgroundSize: 'cover',
      padding: '20px'
    },
    instructorsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      margin: '20px 0'
    },
    instructorLink: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textDecoration: 'none',
      margin: '10px',
      flex: '1 0 21%', // Allows 4 items per row with some margin, adjusts based on screen size
      boxSizing: 'border-box',
      maxWidth: '200px'
    },
    instructorImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    instructorName: {
      marginTop: '10px',
      textAlign: 'center',
      border: 'none',
      background: 'none',
      fontSize: '16px',
      color: '#000'
    }
  };

  return (
    <InstructorSelector />
  );
}
