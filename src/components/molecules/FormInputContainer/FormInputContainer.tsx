import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../../store/ThemeStore/ThemeStore';
import { formInputStyles } from './formInputStyles';
import React, { useMemo } from 'react';




interface FormInputContainerProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: keyof T;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  errors: FieldErrors<T>;
  editable?: boolean
}

const FormInputContainer = <T extends FieldValues>({
  label,
  control,
  name,
  placeholder,
  keyboardType= 'default',
  secureTextEntry = false,
  errors,
  editable = true,
}: FormInputContainerProps<T>) => {
  const {theme} = useTheme();

  const styles =  useMemo(() => formInputStyles(theme), [theme]);

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name as any}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={theme.placeholderText}
            editable={editable}
          />
        )}
      />
      {errors?.[name] && (
        <Text style={styles.errorText}>{errors?.[name]?.message as string}</Text>
      )}
    </View>
  );
};

export default React.memo(FormInputContainer);
