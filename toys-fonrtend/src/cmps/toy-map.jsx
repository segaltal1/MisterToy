
import { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Button } from '@material-ui/core';
import { Loader } from './laoder';

class _ToyMap extends Component {

    state = {
        center: {
            lat: 32.109333,
            lng: 34.855499
        },
        isInfoWindowOn: false,
        isLoading: true
    }

    onMapClicked = (props, map, ev) => {
        console.log('props', props);
        console.log('map', map);
        console.log('ev', ev);
        this.setState({ center: { lat: ev.latLng.lat(), lng: ev.latLng.lng() } })
    }

    onMarkerClicked = () => {
        this.setState({ isInfoWindowOn: true })
    }

    onInfoWindowClose = () => {
        this.setState({ isInfoWindowOn: false })
    }
    setCenter = (cordinats) => {
        this.setState({ center: { lat: cordinats.lat, lng: cordinats.lng } })

    }

    render() {
        const containerStyle = {
            position: 'relative',
            width: '380px',
            height: '300px'
        }
        const { isLoading } = this.state
        return (
            <section className="toy-map">
                <h1>Our Branches</h1>
                {isLoading && <Loader />}
                <Map
                    onReady={() => this.setState({ isLoading: false })}
                    google={this.props.google}
                    zoom={10}
                    initialCenter={this.state.center}
                    onClick={this.onMapClicked}
                    center={this.state.center}
                    containerStyle={containerStyle}
                >

                    <Marker
                        position={this.state.center}
                        name={'Current location'}
                        onClick={this.onMarkerClicked}
                        animation={2}
                    />

                    <InfoWindow
                        onClose={this.onInfoWindowClose}
                        position={this.state.center}
                        visible={this.state.isInfoWindowOn}
                    >
                        <div>
                            <h1>Hello</h1>
                        </div>
                    </InfoWindow>
                </Map>
                <div className="branches-btn flex align-center">
                    <Button onClick={() => this.setCenter({
                        lat: 33.01135,
                        lng: 35.09467
                    })}
                        variant={'contained'}
                        color={'primary'}
                        disabled={false}>
                        Nahariya
                    </Button>
                    <Button onClick={() => this.setCenter({
                        lat: 32.109333,
                        lng: 34.855499
                    })}
                        variant={'contained'}
                        color={'primary'}
                        disabled={false}>
                        Tel Aviv
                    </Button>

                    <Button onClick={() => this.setCenter({
                        lat: 32.794044,
                        lng: 34.989571
                    })}
                        variant={'contained'}
                        color={'primary'}
                        disabled={false}>
                        Haifa
                    </Button>
                </div>
            </section>
        );
    }
}

export const ToyMap = GoogleApiWrapper({
    apiKey: ('AIzaSyCKooXcJHb8LTygVKNzY3xut5a1nqwYzFE')
})(_ToyMap)