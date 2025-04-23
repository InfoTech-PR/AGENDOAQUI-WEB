import { darken } from 'polished';

const primaryColor = 'rgba(128, 177, 223, 0.8)';

const theme = {
    colors: {
        primary: primaryColor,
        primaryDark: darken(0.45, primaryColor),
        primaryTransparent1: 'rgba(36, 93, 146, 0.5)',
        primaryTransparent2: 'rgba(36, 93, 146, .15)',
        background: '#000',
        text: '#000',
        inputBg: '#fff',
        inputBorder: primaryColor,
        placeholder: darken(0.25, primaryColor),
        linkHover: '#ffa64d',

        // Cores para campos desabilitados
        disabledBg: '#f5f5f5',      // Fundo do campo desabilitado
        disabledBorder: '#dcdcdc',  // Borda do campo desabilitado
        disabledText: '#a8a8a8',    // Cor do texto do campo desabilitado
    },
};

export default theme;
