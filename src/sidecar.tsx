import { exportSidecar } from 'use-sidecar';

import { RemoveScrollSideCar } from './SideEffect.tsx';
import { effectCar } from './medium.ts';

export default exportSidecar(effectCar, RemoveScrollSideCar);
