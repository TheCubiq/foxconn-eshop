import { quintOut } from 'svelte/easing';
import type { FadeParams, FlyParams, TransitionConfig } from 'svelte/transition';

type AnimationParams = TransitionConfig | FlyParams | FadeParams;

export function transitionFix({
	delay = 0,
	duration = 1000,
	easing = quintOut,
	...args
}: AnimationParams) {
	const virtual_duration = delay + duration;
	const threshold = delay / virtual_duration;
	return {
		...args,
		duration: virtual_duration,
		easing: (x: number) => (x < threshold ? 0 : easing((x - threshold) / (1 - threshold)))
	};
};
