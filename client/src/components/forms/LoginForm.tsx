import { Facebook, Google, LinkedIn } from "@mui/icons-material"
import { Avatar, Box, Button, SxProps, TextField, Typography } from "@mui/material"
import { blue, red } from "@mui/material/colors"


interface Props {
    active: Boolean
}

export const LoginForm: React.FC<Props> = ({ active }) => {

    const formStyle: SxProps = {
        position: 'absolute',
        height: '100%',
        width: '50%',
        top: 0,
        left: 0,
        py: 5,
        zIndex: 2,
        transition: 'all .6s ease-in-out'
    }

    const flexCenter: SxProps = {
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }

    const activeStyle: SxProps = {
        transform: 'translateX(100%)',
        opacity: 0,
    }

    return (
        <Box sx={{ ...formStyle, ...(active ? activeStyle : {}) }} >

            <Box sx={{ ...flexCenter, height: '100%', width: '100%' }}>

                <Typography sx={{ mb: 2 }} variant='h4'>
                    Login
                </Typography>

                <Box sx={{ display: 'flex', gap: '.25rem' }}>
                    <Avatar sx={{ background: red[500] }} ><Google /></Avatar>
                    <Avatar sx={{ background: blue[500] }} ><Facebook /></Avatar>
                    <Avatar sx={{ background: blue[800] }} ><LinkedIn /></Avatar>
                </Box>

                <Typography variant='body1'>
                    or use your email for login
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>


                    <TextField
                        label='Email'
                        size='small'
                        InputProps={{
                            disableUnderline: true,
                            style: { borderRadius: 4 }
                        }}
                        variant='filled'
                        sx={{ mb: 1, border: 'none', borderRadius: 4 }}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        size='small'
                        InputProps={{
                            disableUnderline: true,
                            style: { borderRadius: 4 }
                        }}
                        variant='filled'
                        sx={{ mb: 1, border: 'none', borderRadius: 4 }}
                    />


                    <Button sx={{ mt: 1, width: '10rem', background: red[400], borderRadius: 5 }} variant='contained'>
                        Login
                    </Button>


                </Box>

            </Box>

        </Box >
    )

}
