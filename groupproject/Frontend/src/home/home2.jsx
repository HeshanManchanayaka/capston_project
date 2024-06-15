

const Body = () => {
    return (
        <div style={styles.body}>
            <h2>Choose Your Path</h2>
            <div style={styles.options}>
                <div style={styles.option}>
                    <h3>Mindfulness</h3>
                </div>
                <div style={styles.option}>
                    <h3>Physical Health</h3>
                </div>
            </div>
        </div>
    );
};

const styles = {
    body: {
        textAlign: 'center',
        padding: '20px',
    },
    options: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    option: {
        padding: '20px',
        border: '1px solid #dee2e6',
        borderRadius: '5px',
        width: '150px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }
};

export default Body;
