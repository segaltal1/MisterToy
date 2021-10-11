import React from 'react'
import { ToyMap } from '../cmps/toy-map'
import { Login } from './login';


export class AboutUs extends React.Component {
    state = {
        count: 1000,
    }


    onTellMeMore = () => {
        console.log('Telling you more');
    }
    // const TextFieldOutlined = (props) => <TextField {...props} variant={'outlined'} color={'primary'} />
    render() {
        const isOpen = true
        // const check = () => <Login />
        // console.log("🚀 ~ AboutUs ~ render ~ check", check)
        return (
            <section>
                <ToyMap />
                {/* <BasicModal isOpen={isOpen}> */}
                    {/* <Login /> */}
                {/* </BasicModal> */}
            </section>
        )
    }
}


