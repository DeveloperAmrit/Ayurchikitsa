import { FEATURE_FLAGS, FeatureName } from "./featureFlags";

interface Props {
    children: React.ReactNode;
    featureFlag: FeatureName;
    disabled?: boolean;
}

export function FeatureEnabled({ children, featureFlag, disabled }: Props) {
    if (disabled) {
        return null;
    }

    const flag = FEATURE_FLAGS[featureFlag];

    if (flag.enabled) {
        return <>{children}</>;
    }

    return null;
}


