import stylesForm from '../../styles/components/form.module.scss';

interface Props
{
    name?: string,
    id?: string,
    label?: string,
    type?: string,
    placeholder?: string,
    error?: string,
    onChange?: () => void,
    required?: boolean
}

const Input = ({ id, label, type, placeholder, error, onChange, required, name }: Props) =>
{
    return (
        <label className={stylesForm.label} htmlFor={ id }>
            <span>
                { label }
            </span>
            <input required={ required } onChange={onChange} className={stylesForm.input} placeholder={ placeholder } type={ type ?? 'text' } id={ id ?? name } name={ name ?? id }/>
            <p className={stylesForm.messageError} data-active={ !!error }>
                { error }
            </p>
        </label>
    );
};

export default Input;
