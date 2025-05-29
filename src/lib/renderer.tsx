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
        
        let buttonComponentProps: React.ComponentProps<typeof Button> = {
          key: i,
          style: generalInlineStyles, // Apply general inline styles first
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
            // If a general backgroundColor was set via style, clear it because named class takes over.
            if (buttonComponentProps.style?.backgroundColor) {
              delete buttonComponentProps.style.backgroundColor;
            }
          } else if (lowerBgColorAttr.startsWith('#') || lowerBgColorAttr.startsWith('rgb')) {
            buttonComponentProps.style = { ...buttonComponentProps.style, backgroundColor: buttonBgColorAttr };
          }
        } else if (!buttonComponentProps.style?.backgroundColor && generalClassNames.every(cn => !cn.startsWith('bg-'))) {
          // Default button background if NO 'color' attribute on button AND NO 'bgColor' from general styles.
          specificBgClass = namedBgColorClasses.blue;
        }
        
        // generalClassNames might include text color (from textColor) or other bg colors (from bgColor).
        // If specificBgClass is set, ensure no other bg-* class from generalClassNames is present.
        let finalClassNames = generalClassNames.filter(cn => !cn.startsWith('bg-'));
        if (specificBgClass) {
          finalClassNames.push(specificBgClass);
        }
        buttonComponentProps.className = finalClassNames.filter(Boolean).join(' ');
        
        return (
          <Button {...buttonComponentProps}>
            {buttonEl.text}
          </Button>
        );
      
      case 'Container':
        const containerEl = el as ContainerElement;
        // Ensure this is the only declaration of generalClassNames and generalInlineStyles in this block.
        const { classNames: generalClassNames, inlineStyles: generalInlineStyles } = processStyleAttributes(containerEl.attributes);
        
        // Comments explaining interaction with Container.tsx defaults and Tailwind precedence:
        // - Container.tsx has default classes (e.g., 'p-4 border rounded shadow-md my-2').
        // - `generalClassNames` (e.g., from `padding=2` becoming `p-2`) are appended.
        // - Tailwind applies the last conflicting utility class (e.g., `p-4 ... p-2` results in `p-2`).
        // - `generalInlineStyles` are applied directly.

        return (
          <Container 
            key={i} 
            style={generalInlineStyles} 
            className={generalClassNames.join(' ')}
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
        const inputComponentProps = {
          key: i,
          ...inputEl.attributes, // Spread specific input attributes like value, placeholder, name, etc.
          type: inputEl.attributes.type || 'text',
          className: inputClassNames.join(' '), // Pass general classes to be appended
          style: inputInlineStyles,
        };
        return <Input {...inputComponentProps} />;

      case 'Checkbox':
        const checkboxEl = el as CheckboxElement;
        const { classNames: checkboxContainerClassNames, inlineStyles: checkboxContainerInlineStyles } = processStyleAttributes(checkboxEl.attributes);
        const checkboxComponentProps = {
          key: i,
          label: checkboxEl.text,
          defaultChecked: checkboxEl.attributes.checked === 'true',
          value: checkboxEl.attributes.value,
          name: checkboxEl.attributes.name,
          id: checkboxEl.attributes.id,
          className: checkboxContainerClassNames.join(' '), 
          style: checkboxContainerInlineStyles,
        };
        return <Checkbox {...checkboxComponentProps} />;

      case 'RadioGroup':
        const radioGroupEl = el as RadioGroupElement;
        const { classNames: radioGroupClassNames, inlineStyles: radioGroupInlineStyles } = processStyleAttributes(radioGroupEl.attributes);
        const groupName = radioGroupEl.attributes.name || `radiogroup-${i}`;

        return (
          <RadioGroup
            key={i}
            label={radioGroupEl.text}
            name={groupName}
            id={radioGroupEl.attributes.id}
            className={radioGroupClassNames.join(' ')}
            style={radioGroupInlineStyles}
          >
            {radioGroupEl.children.map((radioChild, radioIdx) => {
              const { classNames: rbClassNames, inlineStyles: rbInlineStyles } = processStyleAttributes(radioChild.attributes);
              const radioButtonProps = {
                key: `${i}-${radioIdx}`,
                label: radioChild.text,
                defaultChecked: radioChild.attributes.checked === 'true',
                value: radioChild.attributes.value,
                name: groupName,
                id: radioChild.attributes.id,
                className: rbClassNames.join(' '), 
                style: rbInlineStyles, 
              };
              return <RadioButton {...radioButtonProps} />;
            })}
          </RadioGroup>
        );
      
      case 'RadioButton':
        console.warn('Renderer Warning: Orphan RadioButton element encountered. Rendering with a default name.');
        const radioButtonEl = el as RadioButtonElement;
        const { classNames: orphanRbClassNames, inlineStyles: orphanRbInlineStyles } = processStyleAttributes(radioButtonEl.attributes);
        const orphanRadioProps = {
          key: i,
          label: radioButtonEl.text,
          defaultChecked: radioButtonEl.attributes.checked === 'true',
          value: radioButtonEl.attributes.value,
          name: `orphan-radio-group-${i}`,
          id: radioButtonEl.attributes.id,
          className: orphanRbClassNames.join(' '),
          style: orphanRbInlineStyles,
        };
        return <RadioButton {...orphanRadioProps} />;

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
        const selectComponentProps = {
          key: i,
          label: selectEl.text,
          name: selectEl.attributes.name,
          id: selectEl.attributes.id,
          required: selectEl.attributes.required === 'true',
          defaultValue: defaultValueFromOptions,
          className: selectClassNames.join(' '), 
          style: selectInlineStyles, 
        };
        return (
          <Select {...selectComponentProps}>
            {selectEl.children.map((optionEl, optionIdx) => {
              const { classNames: optClassNames, inlineStyles: optInlineStyles } = processStyleAttributes(optionEl.attributes);
              const optionComponentProps = {
                key: `${i}-${optionIdx}`,
                value: optionEl.attributes.value || optionEl.text,
                disabled: optionEl.attributes.disabled === 'true',
                className: optClassNames.join(' '), 
                style: optInlineStyles, 
              };
              return <Option {...optionComponentProps}>{optionEl.text}</Option>;
            })}
          </Select>
        );

      case 'Option':
        console.warn('Renderer Warning: Orphan Option element encountered. Rendering it directly, but it might not function as expected.');
        const optionEl = el as OptionElement;
        const { classNames: orphanOptClassNames, inlineStyles: orphanOptInlineStyles } = processStyleAttributes(optionEl.attributes);
        const orphanOptionProps = {
          key: i,
          value: optionEl.attributes.value || optionEl.text,
          disabled: optionEl.attributes.disabled === 'true',
          className: orphanOptClassNames.join(' '),
          style: orphanOptInlineStyles,
        };
        return <Option {...orphanOptionProps}>{optionEl.text}</Option>;

      case 'Image':
        const imageEl = el as ImageElement;
        const { classNames: imageClassNames, inlineStyles: imageInlineStyles } = processStyleAttributes(imageEl.attributes);
        
        if (!imageEl.attributes.src) {
          console.warn('Image element is missing "src" attribute:', imageEl.attributes);
          return <div key={i} className="text-red-500 text-xs p-2 bg-red-100 border border-red-300 rounded">[Image: SRC attribute is missing]</div>;
        }
        // Specific image attributes (width, height for <img> tag) override generic width/height from styles if any conflict.
        // HTML attributes take precedence over CSS for `width` and `height` on `<img>`
        const imageComponentProps = {
          key: i,
          src: imageEl.attributes.src,
          alt: imageEl.attributes.alt,
          width: imageEl.attributes.width, // Specific prop for <img> width attribute
          height: imageEl.attributes.height, // Specific prop for <img> height attribute
          title: imageEl.attributes.title,
          loading: imageEl.attributes.loading as 'eager' | 'lazy' | undefined,
          className: imageClassNames.join(' '),
          style: imageInlineStyles, 
        };
        return <Image {...imageComponentProps} />;

      case 'Icon':
        const iconEl = el as IconElement;
        const { classNames: iconClassNames, inlineStyles: iconInlineStyles } = processStyleAttributes(iconEl.attributes);

        if (!iconEl.attributes.name) {
          console.warn('Icon element is missing "name" attribute:', iconEl.attributes);
          return <div key={i} className="text-red-500 text-xs p-2 bg-red-100 border border-red-300 rounded">[Icon: NAME attribute is missing]</div>;
        }
        // Icon component's specific 'color' and 'size' props are used for its internal styling.
        // We merge general styles, but Icon's internal logic for its specific props might override parts of `iconInlineStyles`.
        const iconComponentProps = {
          key: i,
          name: iconEl.attributes.name,
          color: iconEl.attributes.color, 
          size: iconEl.attributes.size,   
          title: iconEl.attributes.label || iconEl.attributes.title,
          className: iconClassNames.join(' '),
          style: iconInlineStyles, 
        };
        return <Icon {...iconComponentProps} />;

      case 'Tag':
        const tagEl = el as TagElement;
        const { classNames: tagClassNames, inlineStyles: tagInlineStyles } = processStyleAttributes(tagEl.attributes);
        // Tag component has specific 'color' and 'size' props.
        // Similar to Icon, merge general styles, but Tag's internal logic for its props takes precedence for its specific styling.
        const tagComponentProps = {
          key: i,
          text: tagEl.text,
          color: tagEl.attributes.color, 
          size: tagEl.attributes.size,   
          className: tagClassNames.join(' '),
          style: tagInlineStyles,
        };
        return <Tag {...tagComponentProps} />;
        
      default:
        return null;
    }
  });
}
