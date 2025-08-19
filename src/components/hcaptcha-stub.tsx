"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HCaptchaStubProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export function HCaptchaStub({
  onVerify,
  onError,
  onExpire,
}: HCaptchaStubProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    setIsLoading(true);

    // Simulate captcha verification delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success (90% success rate for demo)
    const success = Math.random() > 0.1;

    if (success) {
      const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setIsVerified(true);
      setIsLoading(false);
      onVerify(mockToken);
    } else {
      setIsLoading(false);
      onError?.();
    }
  };

  const handleExpire = () => {
    setIsVerified(false);
    onExpire?.();
  };

  if (isVerified) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
      >
        <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
          <Check className="h-5 w-5" />
          <span className="text-sm font-medium">Verification complete</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExpire}
          className="ml-4 text-xs text-muted-foreground hover:text-foreground"
        >
          Reset
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6 bg-muted/50 border border-dashed border-border rounded-lg">
      <div className="text-center">
        <Shield className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-4">
          Please verify that you&apos;re not a robot
        </p>
        <Button
          onClick={handleVerify}
          disabled={isLoading}
          size="sm"
          className="min-w-[120px]"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            "I'm not a robot"
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          hCaptcha (Demo Mode)
        </p>
      </div>
    </div>
  );
}
