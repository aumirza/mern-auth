import { Facebook, Google, LinkedIn } from '@mui/icons-material'
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    SxProps,
    TextField,
    Typography,
} from '@mui/material'
import { blue, red } from '@mui/material/colors'
import { useFormik } from 'formik'

import { loginSchema } from '../../schemas/loginSchema'
import authService from '../../services/authService'

interface Props {
    active: Boolean
}

export const LoginForm: React.FC<Props> = ({ active }) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { setStatus, setSubmitting, setErrors }) => {
            setStatus()
            const { email, password } = values
            await authService
                .login(email, password)
                .then((data) => {
                    setStatus(data.message)
                    setSubmitting(false)
                })
                .catch((err) => {
                    setSubmitting(false)
                    if (err.message === 'validationError') {
                        setErrors(err.fileds)
                    } else {
                        setStatus(err.message)
                    }
                })
        },
    })

    const formStyle: SxProps = {
        position: 'absolute',
        height: '100%',
        width: '50%',
        top: 0,
        left: 0,
        py: 5,
        zIndex: 2,
        transition: 'all .6s ease-in-out opacity 0.3s ease-out',
    }

    const flexCenter: SxProps = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const activeStyle: SxProps = {
        transform: 'translateX(100%)',
        opacity: 0,
    }

    return (
        <Box sx={{ ...formStyle, ...(active ? activeStyle : {}) }}>
            <Box sx={{ ...flexCenter, height: '100%', width: '100%' }}>
                <Typography sx={{ mb: 2 }} variant="h4">
                    Login
                </Typography>

                <Box sx={{ display: 'flex', gap: '.25rem' }}>
                    <Avatar sx={{ background: red[500] }}>
                        <Google />
                    </Avatar>
                    <Avatar sx={{ background: blue[500] }}>
                        <Facebook />
                    </Avatar>
                    <Avatar sx={{ background: blue[800] }}>
                        <LinkedIn />
                    </Avatar>
                </Box>

                <Typography variant="body1">or use your email for login</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                    <TextField
                        label="Email"
                        size="small"
                        name="email"
                        InputProps={{
                            disableUnderline: true,
                            style: { borderRadius: 4 },
                        }}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="filled"
                        sx={{ mb: 1, border: 'none', borderRadius: 4 }}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        type="password"
                        size="small"
                        InputProps={{
                            disableUnderline: true,
                            style: { borderRadius: 4 },
                        }}
                        variant="filled"
                        sx={{ mb: 1, border: 'none', borderRadius: 4 }}
                    />

                    {formik.status && (
                        <Typography variant="body2" sx={{ color: 'red' }}>
                            {formik.status}
                        </Typography>
                    )}

                    <Button
                        sx={{ mt: 1, width: '10rem', background: red[400], borderRadius: 5 }}
                        disabled={Boolean(formik.isSubmitting)}
                        onClick={() => formik.handleSubmit()}
                        variant="contained"
                    >
                        {formik.isSubmitting ? <CircularProgress size={25} /> : 'Login'}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
