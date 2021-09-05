import SettingsValidation from "../validations/SettingsValidation.js";
import fs from "fs";
import path from "path";
let __dirname = path.resolve(path.dirname(""));

class CourseController {

    static async getCourses(req, res){
        try {
            const courses = await req.postgres.courses.findAll();

            res.status(200).json({
                ok: true,
                data: courses
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

    static async getCourse(req, res){
        try {
            const course = await req.postgres.courses.findOne({
                where: {
                    course_id: req.params.course_id
                }
            });

            res.status(200).json({
                ok: true,
                data: course
            })
        } catch (e) {
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }

}

export default CourseController;
