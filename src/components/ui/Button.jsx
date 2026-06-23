import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import Icon from '../AppIcon';

const buttonVariants = cva(
    "group inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium ring-offset-background transition-all duration-fluid ease-fluid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-diffusion hover:shadow-diffusion-dark hover:bg-primary/95",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md",
                outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent/10 hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-6 py-3 text-sm",
                sm: "h-10 px-4 py-2 text-sm",
                lg: "h-14 px-8 py-4 text-base",
                icon: "h-12 w-12",
                xs: "h-8 px-3 text-xs",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({
    className,
    variant,
    size,
    asChild = false,
    children,
    loading = false,
    iconName = null,
    iconPosition = 'left',
    iconSize = null,
    fullWidth = false,
    disabled = false,
    ...props
}, ref) => {
    const Comp = asChild ? Slot : "button";

    const iconSizeMap = {
        xs: 12,
        sm: 14,
        default: 16,
        lg: 18,
        icon: 16,
    };

    const calculatedIconSize = iconSize || iconSizeMap?.[size] || 16;

    const LoadingSpinner = () => (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 0 0-8-8V2z" />
        </svg>
    );

    const renderLeadingIcon = () => {
        if (!iconName || iconPosition !== 'left') return null;
        return (
            <Icon
                name={iconName}
                size={calculatedIconSize}
                className={cn(children && "mr-2")}
                strokeWidth={1.5}
            />
        );
    };

    const renderTrailingIcon = () => {
        if (!iconName || iconPosition !== 'right') return null;
        
        // Button-in-Button Pattern
        return (
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-fluid ease-fluid",
                variant === 'default' ? "bg-black/10 dark:bg-white/10 ml-3" : "bg-transparent ml-2",
                "group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105"
            )}>
                <Icon
                    name={iconName}
                    size={calculatedIconSize}
                    strokeWidth={1.5}
                />
            </div>
        );
    };

    const content = (
        <>
            {loading && <LoadingSpinner />}
            {renderLeadingIcon()}
            {children}
            {renderTrailingIcon()}
        </>
    );

    if (asChild) {
        if (!children || React.Children?.count(children) !== 1) {
            return (
                <button
                    className={cn(buttonVariants({ variant, size, className }), fullWidth && "w-full")}
                    ref={ref}
                    disabled={disabled || loading}
                    {...props}
                >
                    {content}
                </button>
            );
        }
        
        const child = React.Children.only(children);
        const clonedChild = React.cloneElement(child, {
            className: cn(
                buttonVariants({ variant, size, className }),
                fullWidth && "w-full",
                child.props.className
            ),
            disabled: disabled || loading || child.props.disabled,
            children: content,
        });
        
        return <Comp ref={ref} {...props}>{clonedChild}</Comp>;
    }

    return (
        <Comp
            className={cn(
                buttonVariants({ variant, size, className }),
                fullWidth && "w-full"
            )}
            ref={ref}
            disabled={disabled || loading}
            {...props}
        >
            {content}
        </Comp>
    );
});

Button.displayName = "Button";
export default Button;