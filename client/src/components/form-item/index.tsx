import { Alert } from "antd";
import { Button, Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";
import styles from "./index.module.css";
import { PATHS } from "../../paths";

type PropsCustomButton = {
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
  danger?: boolean;
  loading?:
    | boolean
    | {
        delay?: number | undefined;
      }
    | undefined;
  shape?: "default" | "circle" | "round" | undefined;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type PropsCustomInput = {
  name: string;
  placeholder?: string;
  type?: string;
};

type PropsImageCheckBox = {
  id: string;
  src: string;
  alt: string;
  checked?: boolean; // Добавлено опциональное свойство для отслеживания состояния чекбокса
  onChange?: (id: string, checked: boolean) => void; // Добавлено опциональное свойство для обработки изменений
};

type PropsErrorMessage = {
  message?: string;
};

type PropsPasswordInput = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
};

export const PasswordInput: React.FC<PropsPasswordInput> = ({
  name,
  placeholder,
  dependencies,
}) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: "Обязательное поле",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }
            if (name === "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли должны совпадать"));
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error("Длина пароля должна быть не менее 6 символов")
                );
              }
              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password
        placeholder={placeholder}
        size="large"
        className={styles.passwordInput}
      />
    </Form.Item>
  );
};

export const ErrorMessage: React.FC<PropsErrorMessage> = ({ message }) => {
  if (!message) {
    return null;
  }
  return <Alert message={message} type="error" />;
};

export const ImageCheckbox: React.FC<PropsImageCheckBox> = ({
  id,
  src,
  alt,
  checked,
  onChange,
}) => {
  // Обработчик изменения состояния чекбокса
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(id, event.target.checked);
    }
  };

  return (
    <label className={styles.imageCheckboxLabel}>
      <input
        type="checkbox"
        id={id}
        className={styles.imageCheckbox}
        checked={checked}
        onChange={handleOnChange}
      />
      <div className={styles.imageContainer}>
        <img
          src={`${PATHS.URL}${src}`}
          alt={alt}
          className={styles.imageCheckboxImage}
        />
      </div>
    </label>
  );
};

export const CustomInput: React.FC<PropsCustomInput> = ({
  name,
  placeholder,
  type = "text",
}) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: "Обязательное поле" }]}
    >
      <Input
        className={styles.customInput}
        placeholder={placeholder}
        type={type}
        size="large"
      />
    </Form.Item>
  );
};

export const CustomButton: React.FC<PropsCustomButton> = ({
  children,
  htmlType = "button",
  type,
  danger,
  loading,
  shape,
  icon,
  disabled = false,
  onClick,
}) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        onClick={onClick}
        className={styles.button}
        disabled={disabled}
      >
        {children}
      </Button>
    </Form.Item>
  );
};
