// # VolleyDevByMaubry [3/4] "Colores que susurran emociones, formas que despiertan sentido: la UI como poesía en movimiento."

import React from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import Title from '../components/Title';
import Text from '../components/Text';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import RadioGroup from '../components/RadioGroup';
import RadioButton from '../components/RadioButton';
import Select from '../components/Select';
import Option from '../components/Option';
import Image from '../components/Image';
import Icon from '../components/Icon';
import Tag from '../components/Tag'; // Import Tag component
import type { 
  UIElement, 
  ButtonElement, 
  ContainerElement, 
  TitleElement, 
  TextElement, 
  InputElement, 
  CheckboxElement,
  RadioGroupElement,
  RadioButtonElement,
  SelectElement,
  OptionElement,
  ImageElement,
  IconElement,
  TagElement      // Import TagElement type
} from './parser';
import * as styleUtils from './styleUtils'; // Import style utilities

interface RendererProps {
  elements: UIElement[];
}

// Helper function to process generic styling attributes
function processStyleAttributes(attributes: Record<string, string | undefined>): { classNames: string[], inlineStyles: React.CSSProperties } {
  const classNames: string[] = [];
  let inlineStyles: React.CSSProperties = {};

  if (attributes.padding) {
    const spacing = styleUtils.parseSpacing(attributes.padding, 'p');
    if (spacing.className) classNames.push(spacing.className);
    if (spacing.style) inlineStyles = { ...inlineStyles, ...spacing.style };
  }
  if (attributes.margin) {
    const spacing = styleUtils.parseSpacing(attributes.margin, 'm');
    if (spacing.className) classNames.push(spacing.className);
    if (spacing.style) inlineStyles = { ...inlineStyles, ...spacing.style };
  }
  if (attributes.shadow) {
    const shadowClass = styleUtils.parseShadow(attributes.shadow);
    if (shadowClass) classNames.push(shadowClass);
  }
  // Use a common attribute name like 'rounded' or 'radius' instead of 'border-radius' for easier typing by user
  const borderRadiusAttr = attributes.rounded || attributes.radius || attributes['border-radius'];
  if (borderRadiusAttr) {
    const radius = styleUtils.parseBorderRadius(borderRadiusAttr);
    if (radius.className) classNames.push(radius.className);
    if (radius.style) inlineStyles = { ...inlineStyles, ...radius.style };
  }
  // Text color (foreground) - attribute "textColor" to avoid confusion with "color" for Button/Tag bg
  if (attributes.textColor) { 
    const colorStyle = styleUtils.parseColor(attributes.textColor, 'color');
    if (colorStyle.className) classNames.push(colorStyle.className);
    if (colorStyle.style) inlineStyles = { ...inlineStyles, ...colorStyle.style };
  }
  // Background color (general one)
  if (attributes.bgColor || attributes.backgroundColor) { 
    const bgColorStyle = styleUtils.parseColor(attributes.bgColor || attributes.backgroundColor, 'backgroundColor');
    if (bgColorStyle.className) classNames.push(bgColorStyle.className);
    if (bgColorStyle.style) inlineStyles = { ...inlineStyles, ...bgColorStyle.style };
  }
  if (attributes.align) { // Typically text-align for text elements, or self-align for flex items
    const textAlignClass = styleUtils.parseTextAlign(attributes.align);
    if (textAlignClass) classNames.push(textAlignClass);
    // Note: self-align items (items-*, self-*) might need context or be applied differently
  }
  
  if (attributes.width) {
    const sizeStyle = styleUtils.parseSize(attributes.width, 'width');
    if (sizeStyle.className) classNames.push(sizeStyle.className);
    if (sizeStyle.style) inlineStyles = { ...inlineStyles, ...sizeStyle.style };
  }
  if (attributes.height) {
    const sizeStyle = styleUtils.parseSize(attributes.height, 'height');
    if (sizeStyle.className) classNames.push(sizeStyle.className);
    if (sizeStyle.style) inlineStyles = { ...inlineStyles, ...sizeStyle.style };
  }

  return { classNames, inlineStyles };
}

export function renderUI(elements: UIElement[]) {
  return elements.map((el, i) => {
    switch (el.type) {
      case 'Button':
        const buttonEl = el as ButtonElement;
        const { classNames: generalClassNames, inlineStyles: generalInlineStyles } = processStyleAttributes(buttonEl.attributes);
        
        // DUPLICATE LINE REMOVED
        
        let allButtonProps = { 
          key: i,
          style: generalInlineStyles,
          className: '', 
        };

        // Button-specific background color logic (from its 'color' attribute for background)
        const buttonBgColorAttr = buttonEl.attributes?.color; 
        const namedBgColorClasses: Record<string, string> = {
          blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-400',
          red: 'bg-red-600 hover:bg-red-700 focus:ring-red-400',
          green: 'bg-green-600 hover:bg-green-700 focus:ring-green-400',
          yellow: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300',
          gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-400',
        };

        let specificBgClass = '';
        // Precedence: Button's 'color' attribute for background overrides general 'bgColor' or 'backgroundColor'.
        if (buttonBgColorAttr) {
          const lowerBgColorAttr = buttonBgColorAttr.toLowerCase();
          if (namedBgColorClasses[lowerBgColorAttr]) {
            specificBgClass = namedBgColorClasses[lowerBgColorAttr];
            if (allButtonProps.style?.backgroundColor) { // CORRECTED
              delete allButtonProps.style.backgroundColor; // CORRECTED
            }
          } else if (lowerBgColorAttr.startsWith('#') || lowerBgColorAttr.startsWith('rgb')) {
            allButtonProps.style = { ...allButtonProps.style, backgroundColor: buttonBgColorAttr }; // CORRECTED
          }
        } else if (!allButtonProps.style?.backgroundColor && generalClassNames.every(cn => !cn.startsWith('bg-'))) { // CORRECTED
          specificBgClass = namedBgColorClasses.blue;
        }
        
        // generalClassNames might include text color (from textColor) or other bg colors (from bgColor).
        // If specificBgClass is set, ensure no other bg-* class from generalClassNames is present.
        let finalClassNames = generalClassNames.filter(cn => !cn.startsWith('bg-'));
        if (specificBgClass) {
          finalClassNames.push(specificBgClass);
        }
        allButtonProps.className = finalClassNames.filter(Boolean).join(' ');
        
        const { key: buttonKey, ...buttonRestProps } = allButtonProps;
        return (
          <Button key={buttonKey} {...buttonRestProps}>
            {buttonEl.text}
          </Button>
        );
      
      case 'Container':
        const containerEl = el as ContainerElement;
        // Renaming variables to ensure uniqueness within this block
        const { classNames: specificContainerClassNames, inlineStyles: specificContainerInlineStyles } = processStyleAttributes(containerEl.attributes);
        
        // Comments explaining interaction with Container.tsx defaults and Tailwind precedence:
        // - Container.tsx has default classes (e.g., 'p-4 border rounded shadow-md my-2').
        // - `specificContainerClassNames` (e.g., from `padding=2` becoming `p-2`) are appended.
        // - Tailwind applies the last conflicting utility class (e.g., `p-4 ... p-2` results in `p-2`).
        // - `specificContainerInlineStyles` are applied directly.

        return (
          <Container 
            key={i} 
            style={specificContainerInlineStyles} 
            className={specificContainerClassNames.join(' ')}
          >
            {renderUI(containerEl.children)}
          </Container>
        );

      case 'Title':
        const titleEl = el as TitleElement;
        const { classNames: titleClassNames, inlineStyles: titleInlineStyles } = processStyleAttributes(titleEl.attributes);
        // Title.tsx has base classes like "text-3xl font-bold my-3".
        // General styles for padding, margin, text color, text alignment will be merged.
        return (
          <Title key={i} className={titleClassNames.join(' ')} style={titleInlineStyles}>
            {titleEl.content}
          </Title>
        );

      case 'Text':
        const textEl = el as TextElement;
        const { classNames: textClassNames, inlineStyles: textInlineStyles } = processStyleAttributes(textEl.attributes);
        // Text.tsx has base classes like "text-base my-2".
        return (
          <Text key={i} className={textClassNames.join(' ')} style={textInlineStyles}>
            {textEl.content}
          </Text>
        );

      case 'Input':
        const inputEl = el as InputElement;
        const { classNames: inputClassNames, inlineStyles: inputInlineStyles } = processStyleAttributes(inputEl.attributes);
        
        // Destructure 'value' and other attributes from inputEl.attributes
        const { value: initialValue, ...restAttributes } = inputEl.attributes;

        const allInputProps = {
          key: i,
          ...restAttributes, // Spread other attributes like placeholder, name, id etc.
          type: inputEl.attributes.type || 'text', // type is still from original attributes or default
          defaultValue: initialValue, // Use defaultValue for the initial value
          className: inputClassNames.join(' '), 
          style: inputInlineStyles,
        };
        const { key: inputKey, ...inputRestProps } = allInputProps;
        return <Input key={inputKey} {...inputRestProps} />;

      case 'Checkbox':
        const checkboxEl = el as CheckboxElement;
        const { classNames: checkboxContainerClassNames, inlineStyles: checkboxContainerInlineStyles } = processStyleAttributes(checkboxEl.attributes);
        const allCheckboxProps = {
          key: i,
          label: checkboxEl.text,
          defaultChecked: checkboxEl.attributes.checked === 'true',
          value: checkboxEl.attributes.value,
          name: checkboxEl.attributes.name,
          id: checkboxEl.attributes.id,
          className: checkboxContainerClassNames.join(' '), 
          style: checkboxContainerInlineStyles,
        };
        const { key: checkboxKey, ...checkboxRestProps } = allCheckboxProps;
        return <Checkbox key={checkboxKey} {...checkboxRestProps} />;

      case 'RadioGroup':
        const radioGroupEl = el as RadioGroupElement;
        const { classNames: radioGroupClassNames, inlineStyles: radioGroupInlineStyles } = processStyleAttributes(radioGroupEl.attributes);
        const groupName = radioGroupEl.attributes.name || `radiogroup-${i}`;

        const allRadioGroupProps = {
            key: i,
            label: radioGroupEl.text,
            name: groupName,
            id: radioGroupEl.attributes.id,
            className: radioGroupClassNames.join(' '),
            style: radioGroupInlineStyles
        };
        const { key: radioGroupKey, ...radioGroupRestProps } = allRadioGroupProps;

        return (
          <RadioGroup key={radioGroupKey} {...radioGroupRestProps}>
            {radioGroupEl.children.map((radioChild, radioIdx) => {
              const { classNames: rbClassNames, inlineStyles: rbInlineStyles } = processStyleAttributes(radioChild.attributes);
              const allRadioButtonProps = { // Renamed to avoid conflict
                key: `${i}-${radioIdx}`, // Unique key for child
                label: radioChild.text,
                defaultChecked: radioChild.attributes.checked === 'true',
                value: radioChild.attributes.value,
                name: groupName, 
                id: radioChild.attributes.id,
                className: rbClassNames.join(' '), 
                style: rbInlineStyles, 
              };
              const { key: radioButtonKey, ...radioButtonRestProps } = allRadioButtonProps;
              return <RadioButton key={radioButtonKey} {...radioButtonRestProps} />;
            })}
          </RadioGroup>
        );
      
      case 'RadioButton':
        console.warn('Renderer Warning: Orphan RadioButton element encountered. Rendering with a default name.');
        const radioButtonEl = el as RadioButtonElement;
        const { classNames: orphanRbClassNames, inlineStyles: orphanRbInlineStyles } = processStyleAttributes(radioButtonEl.attributes);
        const allOrphanRadioProps = {
          key: i,
          label: radioButtonEl.text,
          defaultChecked: radioButtonEl.attributes.checked === 'true',
          value: radioButtonEl.attributes.value,
          name: `orphan-radio-group-${i}`,
          id: radioButtonEl.attributes.id,
          className: orphanRbClassNames.join(' '),
          style: orphanRbInlineStyles,
        };
        const { key: orphanRadioButtonKey, ...orphanRadioButtonRestProps } = allOrphanRadioProps;
        return <RadioButton key={orphanRadioButtonKey} {...orphanRadioButtonRestProps} />;

      case 'Select':
        const selectEl = el as SelectElement;
        const { classNames: selectClassNames, inlineStyles: selectInlineStyles } = processStyleAttributes(selectEl.attributes);
        let defaultValueFromOptions: string | undefined = undefined;
        for (const optEl of selectEl.children) {
          if (optEl.attributes.selected === 'true') {
            defaultValueFromOptions = optEl.attributes.value || optEl.text;
            break;
          }
        }
        const allSelectProps = {
          key: i,
          label: selectEl.text,
          name: selectEl.attributes.name,
          id: selectEl.attributes.id,
          required: selectEl.attributes.required === 'true',
          defaultValue: defaultValueFromOptions,
          className: selectClassNames.join(' '), 
          style: selectInlineStyles, 
        };
        const { key: selectKey, ...selectRestProps } = allSelectProps;

        return (
          <Select key={selectKey} {...selectRestProps}>
            {selectEl.children.map((optionEl, optionIdx) => {
              const { classNames: optClassNames, inlineStyles: optInlineStyles } = processStyleAttributes(optionEl.attributes);
              const allOptionProps = { // Renamed
                key: `${i}-${optionIdx}`, // Unique key for child
                value: optionEl.attributes.value || optionEl.text,
                disabled: optionEl.attributes.disabled === 'true',
                className: optClassNames.join(' '), 
                style: optInlineStyles, 
              };
              const { key: optionKey, ...optionRestProps } = allOptionProps;
              return <Option key={optionKey} {...optionRestProps}>{optionEl.text}</Option>;
            })}
          </Select>
        );

      case 'Option':
        console.warn('Renderer Warning: Orphan Option element encountered. Rendering it directly, but it might not function as expected.');
        const optionEl = el as OptionElement;
        const { classNames: orphanOptClassNames, inlineStyles: orphanOptInlineStyles } = processStyleAttributes(optionEl.attributes);
        const allOrphanOptionProps = {
          key: i,
          value: optionEl.attributes.value || optionEl.text,
          disabled: optionEl.attributes.disabled === 'true',
          className: orphanOptClassNames.join(' '),
          style: orphanOptInlineStyles,
        };
        const { key: orphanOptionKey, ...orphanOptionRestProps } = allOrphanOptionProps;
        return <Option key={orphanOptionKey} {...orphanOptionRestProps}>{optionEl.text}</Option>;

      case 'Image':
        const imageEl = el as ImageElement;
        const { classNames: imageClassNames, inlineStyles: imageInlineStyles } = processStyleAttributes(imageEl.attributes);
        
        if (!imageEl.attributes.src) {
          console.warn('Image element is missing "src" attribute:', imageEl.attributes);
          // Ensure key is passed directly for error case div
          return <div key={i} className="text-red-500 text-xs p-2 bg-red-100 border border-red-300 rounded">[Image: SRC attribute is missing]</div>;
        }
        const allImageProps = {
          key: i,
          src: imageEl.attributes.src,
          alt: imageEl.attributes.alt,
          width: imageEl.attributes.width, 
          height: imageEl.attributes.height, 
          title: imageEl.attributes.title,
          loading: imageEl.attributes.loading as 'eager' | 'lazy' | undefined,
          className: imageClassNames.join(' '),
          style: imageInlineStyles, 
        };
        const { key: imageKey, ...imageRestProps } = allImageProps;
        return <Image key={imageKey} {...imageRestProps} />;

      case 'Icon':
        const iconEl = el as IconElement;
        const { classNames: iconClassNames, inlineStyles: iconInlineStyles } = processStyleAttributes(iconEl.attributes);

        if (!iconEl.attributes.name) {
          console.warn('Icon element is missing "name" attribute:', iconEl.attributes);
          // Ensure key is passed directly for error case div
          return <div key={i} className="text-red-500 text-xs p-2 bg-red-100 border border-red-300 rounded">[Icon: NAME attribute is missing]</div>;
        }
        const allIconProps = {
          key: i,
          name: iconEl.attributes.name,
          color: iconEl.attributes.color, 
          size: iconEl.attributes.size,   
          title: iconEl.attributes.label || iconEl.attributes.title,
          className: iconClassNames.join(' '),
          style: iconInlineStyles, 
        };
        const { key: iconKey, ...iconRestProps } = allIconProps;
        return <Icon key={iconKey} {...iconRestProps} />;

      case 'Tag':
        const tagEl = el as TagElement;
        const { classNames: tagClassNames, inlineStyles: tagInlineStyles } = processStyleAttributes(tagEl.attributes);
        const allTagProps = {
          key: i,
          text: tagEl.text,
          color: tagEl.attributes.color, 
          size: tagEl.attributes.size,   
          className: tagClassNames.join(' '),
          style: tagInlineStyles,
        };
        const { key: tagKey, ...tagRestProps } = allTagProps;
        return <Tag key={tagKey} {...tagRestProps} />;
        
      default:
        return null;
    }
  });
}
