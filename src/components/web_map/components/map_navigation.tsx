import {Button, ButtonGroup} from "@mui/material";

type MapNavigationProps = {
    switchRotation: () => void
    resetCamera: () => void
    hideInfo: () => void
}

export function MapNavigation(props: MapNavigationProps) {
    return <div id={'map-navigation'}>
        <ButtonGroup variant={'contained'}>
            <Button variant={'text'}
                    onClick={props.hideInfo}>
                hide info
            </Button>
            <Button variant={'text'}
                    onClick={props.switchRotation}>
                rotation
            </Button>
            <Button variant={'text'}
                    onClick={props.resetCamera}>
                pan home
            </Button>
        </ButtonGroup>
    </div>
}