import { Box, Button, SxProps, Typography } from '@mui/material'

interface Props {
    isRtl: Boolean
    setRtl: (rtl: Boolean) => void
}

export const OverlayConatiner: React.FC<Props> = ({ isRtl, setRtl }) => {

    const containerStyle: SxProps = {
        position: 'absolute',
        top: 0,
        left: '50%',
        height: '100%',
        width: '50%',
        overflow: 'hidden',
        transition: '0.6s all ease-in-out'
    }


    const containerActiveStyle: SxProps = {
        transform: 'translate(-100%)'
    }

    const overlayStyle: SxProps = {
        position: 'relative',
        left: '-100%',
        height: '100%',
        width: '200%',
        background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
        transform: 'translateX(0)',
        transition: 'transition 0.6s ease-in-out'
    }

    const overlayItemStyle: SxProps = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 2rem',
        top: 0,
        height: '100%',
        width: '50%',
        transform: 'translateX(0%)',
        transition: 'transform 0.6s ease-in-out'
    }

    const overlayItemActiveStyle: SxProps = {
        transform: 'translateX(100%)'
    }

    return (
        <Box sx={{ ...containerStyle, ...(isRtl ? containerActiveStyle : {}) }}>

            <Box sx={overlayStyle} >

                <Box sx={{ ...overlayItemStyle, ...(isRtl ? overlayItemActiveStyle : {}) }} >
                    <Typography variant='body1'>
                        Welcome to the app!
                    </Typography>
                    <Typography variant='body1'>
                        To continue, please sign up.
                    </Typography>

                    <Typography variant='body1'>
                        Already have an account?
                    </Typography>

                    <Button onClick={() => setRtl(false)} >Login</Button>

                </Box>

                <Box sx={{ ...overlayItemStyle, right: 0, ...(isRtl ? overlayItemActiveStyle : {}) }} >
                    <Typography variant='body1'>
                        Welcome to the app!
                    </Typography>
                    <Typography variant='body1'>
                        Do not have account?
                    </Typography>
                    <Button onClick={() => setRtl(true)}>Signup</Button>
                </Box>
            </Box>


        </Box>
    )
}
