import express from 'express';

export const serverInit = () => {
    const app = express();
    const port = 3000;
    
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
}

