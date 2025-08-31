# Icons Folder

This folder contains SVG icon files that are used throughout the application via the `Icon` component.

## How to use

1. **Add new icons**: Place your SVG files directly in this folder (e.g., `my-icon.svg`)
2. **Use icons in components**: Import and use the `Icon` component:

```jsx
import Icon from '../components/Icon';

// Use the icon
<Icon name="my-icon" size={24} className="text-blue-500" />
```

## Icon naming convention

- Use kebab-case for file names (e.g., `arrow-left.svg`, `user-profile.svg`)
- File names should be descriptive and consistent
- Avoid spaces and special characters

## SVG requirements

- Each SVG should have appropriate `viewBox` attribute
- Use `fill="currentColor"` for paths to allow color customization via CSS
- Keep SVGs optimized and minimal

## Available icons

Based on your previous icon library, you may want to create these SVG files:

- `people-team.svg` ✓
- `briefcase-search.svg`
- `chart-multiple.svg`
- `search.svg` ✓
- `close.svg` ✓
- `chevron-left.svg`
- `chevron-right.svg`
- `chat.svg`
- `bell.svg`
- `shield.svg`
- `arrows-rotate.svg`
- `person-ribbon.svg`
- `layer-diagonal-person.svg`
- `person-search.svg`
- `layers.svg`

## Migration from old system

The old icon system used a JavaScript object with path data. The new system loads actual SVG files, which provides:
- Better maintainability
- Easier icon management
- Support for more complex SVG features
- Better performance with bundler optimization