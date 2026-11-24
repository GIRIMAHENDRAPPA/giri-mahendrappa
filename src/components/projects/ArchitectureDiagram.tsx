import { cn } from "@/lib/utils";

/**
 * Illustration of the FraudGuard AI pipeline as described in the repository README.
 * Not a screenshot.
 */
export function ArchitectureDiagram({ compact = false }: { compact?: boolean }) {
  const node = "rounded-lg border border-border-strong bg-card px-2.5 py-1.5 text-center font-mono text-foreground";
  const label = "font-mono uppercase tracking-wider text-muted-foreground";
  return (
    <div
      role="img"
      aria-label="FraudGuard AI pipeline: transaction features feed an Isolation Forest anomaly layer, then XGBoost, LightGBM and CatBoost, combined by a logistic regression meta-learner, producing allow, step-up or decline decisions with SHAP reason codes."
      className={cn(
        "relative flex h-full w-full flex-col justify-center gap-3 overflow-hidden bg-surface p-5",
        compact ? "text-[0.62rem]" : "text-[0.7rem] sm:text-xs sm:p-8 sm:gap-4",
      )}
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="bg-glow pointer-events-none absolute inset-0" />
      <div className="relative flex items-center gap-2">
        <span className={label}>01</span>
        <div className={cn(node, "flex-1")}>Transaction features · time · velocity · haversine</div>
      </div>
      <div className="relative flex items-center gap-2">
        <span className={label}>02</span>
        <div className={cn(node, "flex-1 border-primary/50 text-primary")}>Isolation Forest anomaly score</div>
      </div>
      <div className="relative flex items-center gap-2">
        <span className={label}>03</span>
        <div className="grid flex-1 grid-cols-3 gap-2">
          <div className={node}>XGBoost</div>
          <div className={node}>LightGBM</div>
          <div className={node}>CatBoost</div>
        </div>
      </div>
      <div className="relative flex items-center gap-2">
        <span className={label}>04</span>
        <div className={cn(node, "flex-1")}>Logistic Regression meta-learner → P(fraud)</div>
      </div>
      <div className="relative flex items-center gap-2">
        <span className={label}>05</span>
        <div className="grid flex-1 grid-cols-3 gap-2">
          <div className={cn(node, "text-success")}>Allow</div>
          <div className={cn(node, "text-code-fn")}>Step-up</div>
          <div className={cn(node, "text-destructive")}>Decline</div>
        </div>
      </div>
      <div className="relative flex items-center gap-2">
        <span className={label}>XAI</span>
        <div className={cn(node, "flex-1 border-dashed")}>TreeSHAP reason codes · PSI drift monitor</div>
      </div>
    </div>
  );
}
