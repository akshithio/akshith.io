import { useEffect, useState } from "react";
import { GPU } from "gpu.js";

function useGPU(kernelFn, height, width) {
  const [kernel, setKernel] = useState(null);

  useEffect(() => {
    // Create a GPU instance
    const gpu = new GPU();

    // Define the kernel function
    const kernel = gpu.createKernel(kernelFn);

    // Set the output size of the kernel
    kernel.setOutput([height, width]);

    // Save the kernel in state
    setKernel(kernel);

    // Destroy the GPU instance when the component unmounts
    return () => gpu.destroy();
  }, [kernelFn]);

  return kernel;
}

export default useGPU;
