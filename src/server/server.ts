import { app } from '..';

export default function Server() {
    const port_server = process.env.PORT || 3000;

    app.listen(port_server, () => {
        console.log(`Server is running on http://localhost:${port_server}`);
    })
}