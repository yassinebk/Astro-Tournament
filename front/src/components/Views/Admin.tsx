import { Switch } from '@chakra-ui/react'
import React from 'react'

interface PropTypes{
    questions: Question[],
    levels: Level[],
    user: User,
    setNotification
    
}

const Admin= () => {
    return (
        <Container>
                <Navbar variant="ADMIN"/>
                <Switch>
                </Switch>
                <Footer/>
        </Container>
            
    )
}

export default Admin
