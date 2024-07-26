import { Button, Stack } from "@mui/material";

interface Props {
    activeStep: number;
    handleActiveStep: (buttonType: "back" | "front") => void;
    onSubmit: any;
    steps: string[];
}

export function PropertyFormButton({ activeStep, handleActiveStep, onSubmit, steps }: Props) {
    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="contained"
                color="info"
                type="button"
                disabled={activeStep === 0}
                onClick={() => handleActiveStep("back")}
            >
                Back
            </Button>
            <Button
                variant="contained"
                color="info"
                type="button"
                onClick={steps.length - 1 === activeStep ? onSubmit
                    : () => handleActiveStep("front")}
            >
                {steps.length - 1 === activeStep ? "Submit" : "Continue"}
            </Button>
        </Stack>
    )
}