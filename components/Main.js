import React from 'react';
import { View } from 'react-native';
import { RootTabs } from './Root';

export default class Mains extends React.Component {

    componentDidMount(){
        console.log(Mains.router);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <RootTabs />
            </View>
        );
    }
    
}