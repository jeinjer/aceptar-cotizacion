export const metadata = {
    title: 'TP6 - Cotización',
    description: 'Aceptar cotización - US',
}

interface Props {
    children: React.ReactNode
}

const AdminLayout: React.FC<Props> = ({children}) => {
    return ( 
        <div className="serif antialiased">
            {children}
        </div>
     );
}
 
export default AdminLayout;