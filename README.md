Documentation -

- Introduction
   This project is a Frontend Assignment that implements a simple mentions feature in a React application. Users can input text, mention names by typing '@', and select suggestions from a dropdown. The project is structured with components and a custom hook for managing mentions.

- Project Structure
   src
   components
   App
   App.tsx
   Mentions
   Mentions.tsx
   utils
   customHooks
   useMentions.tsx
   names.json
   styles
   App.css
   Mentions.css

Mentions Component (Mentions.tsx)
The Mentions component handles user input, displays a dropdown of mention suggestions, and triggers the onChange callback. It utilizes the useMentions custom hook for state management.

- Custom Hooks
   useMentions Hook (useMentions.tsx)
   The useMentions hook manages the state and logic for handling mentions. It includes functions for input change and name selection, as well as tracking mention options and selected mentions.

- Styles
   CSS Files
   App.css: Styles for the App component.
   Mentions.css: Styles for the Mentions component.

- Dependencies
   The project relies on React and its related libraries for building the user interface.

- Running the Project
   - Clone the repository.
   - Navigate to the project directory.
   - Run npm install to install dependencies.
   - Run npm start to start the development server.
   - Open your browser and visit http://127.0.0.1:5173/ to view the application.
   
- Conclusion
   This Frontend Assignment demonstrates a simple implementation of mentions functionality in a React application. It follows best practices for component-based development and utilizes a custom hook for state management.
