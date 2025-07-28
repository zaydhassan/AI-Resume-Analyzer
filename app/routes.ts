import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/auth', 'routes/auth.tsx'),
    route('/upload', 'routes/upload.tsx'),
    route('/resume/:id', 'routes/resume.tsx'),
    route('/wipe', 'routes/wipe.tsx'),
    route('/about', 'routes/about.tsx'),
    route('/features', 'routes/features.tsx'),
    route('/contact', 'routes/contact.tsx'),
] satisfies RouteConfig;
