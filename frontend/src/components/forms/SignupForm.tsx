import { Facebook, Google, LinkedIn } from '@mui/icons-material';
import { Avatar, Box, Button, Paper, SxProps, TextField, Typography } from '@mui/material'
import { blue, red } from '@mui/material/colors';
import { useFormik } from 'formik';
import { SignUpSchema } from '../../schemas/signUpSchema';

interface Props {
    active: Boolean
}

export const SignupForm: React.FC<Props> = ({ active }) => {

    const formStyle: SxProps = {
        position: 'absolute',
        height: '100%',
        width: '50%',
        top: 0,
        left: 0,
        py: 5,
        opacity: 0,
        zIndex: 1,
        transition: 'all .6s ease-in-out'
    }

    const activeStyle: SxProps = {
        transform: 'translateX(100%)',
        opacity: 1,
        zIndex: 5,
    }

    const flexCenter: SxProps = {
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }


    return (
        <Box sx={{ ...formStyle, ...(active ? activeStyle : {}) }}>
            <Box sx={{ ...flexCenter, height: '100%', width: '100%' }}>

                <Typography sx={{ mb: 2 }} variant='h4'>
                    Sign up
                </Typography>

                <Box sx={{ display: 'flex', gap: '.25rem' }}>
                    <Avatar sx={{ background: red[500] }} ><Google /></Avatar>
                    <Avatar sx={{ background: blue[500] }} ><Facebook /></Avatar>
                    <Avatar sx={{ background: blue[800] }} ><LinkedIn /></Avatar>
                </Box>

                <Typography variant='body1'>
                    or use your email for registration
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>

                    <TextField
                        label='Name'
                        size='small'
                        InputProps={{
                            disableUnderline: true,
                            style: { borderRadius: 4 }
                        }}
                        variant='filled'
                        sx={{ mb: 1, border: 'none', borderRadius: 4 }}
                    />
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
                        Sign up
                    </Button>


                </Box>

            </Box>

        </Box >
    )
}
