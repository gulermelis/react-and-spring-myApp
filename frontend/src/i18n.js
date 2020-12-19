import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources:{
       en: {
         translations: {
            'Sign Up': 'Sign Up',
            'Password mismatch': 'Password mismatch',
            'Username' : 'Username',
            'Display Name': 'Display Name',
            'Password' : 'Password',
            'Password Repeat' : 'Password Repeat',
            'Login':'Login',
            'Not a member?' : 'Not a member?',
            'Sign up now!':'Sign up now!',
            'Already registered' : 'Already registered',
            'sign in?' : 'sign in?',
            'Logout' : 'Logout'
         }

      },
      tr: {
          translations: {
            'Sign Up': 'Kayıt Ol',
            'Password mismatch':'Şifreler eşleşmiyor',
            'Username' : 'Kullanıcı Adı',
            'Display Name': 'Tercih Edilen isim ',
            'Password' : 'Şifre',
            'Password Repeat' : 'Şifreyi Tekrarla',
            'Login':'Giriş Yap',
            'Not a member?': 'Üye değil misin?',
            'Sign up now!': 'Hemen Üye Ol!',
            'Already registered': 'Zaten bir hesabın var mı?',
            'sign in?' : 'Giriş Yap',
            'Logout': 'Çıkış'
          }
      }
    },
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
       escapeValue:false,
       formatSeperator: ','
    },
    react: {
      wait: true
    }
});

export default i18n;
