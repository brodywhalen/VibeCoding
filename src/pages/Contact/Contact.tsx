import './Contact.css';

export const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <div className="profile-section">
          <div className="profile-image">
            {/* Placeholder avatar using initials */}
            <div className="avatar">BW</div>
          </div>
          <div className="profile-info">
            <h2>Brody Whalen</h2>
            <p className="title">Aspiring AI Developer</p>
            <div className="contact-details">
              <p><strong>Email:</strong> example@email.com</p>
              <p><strong>Location:</strong> United States</p>
              <p><strong>GitHub:</strong> github.com/brodywhalen</p>
            </div>
          </div>
        </div>
        <div className="bio-section">
          <h3>About Me</h3>
          <p>
            I'm a passionate learner diving into the world of software development with a particular 
            focus on AI integration. As a novice coder, I'm excited about exploring how artificial 
            intelligence can enhance and streamline the development process.
          </p>
          <p>
            Currently, I'm building my skills in React, TypeScript, and various AI tools to create 
            more intelligent and efficient applications. I believe in the power of AI to transform 
            how we approach coding and problem-solving.
          </p>
          <p>
            My goal is to become proficient in AI-assisted development while maintaining a strong 
            understanding of fundamental programming concepts. I'm always eager to learn new 
            technologies and best practices in this rapidly evolving field.
          </p>
        </div>
      </div>
    </div>
  );
}; 